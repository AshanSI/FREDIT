import { Box, Button, Divider, Group, Text, TextInput, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import { User } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { db } from '../../firebase/firebaseConfig';

interface PollFormProps {
  loading: boolean;
  setLoading: Function;
  user: User;
  communityId: string | undefined;
}

interface PollOption {
  id: number;
  value: string;
}

const PollForm: React.FC<PollFormProps> = ({
  loading,
  setLoading,
  user,
  communityId,
}) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      title: '',
      options: [{ id: Date.now(), value: '' }],
    },
  });

  const addOption = () => {
    form.insertListItem('options', { id: Date.now(), value: '' });
  };

  const removeOption = (index: number) => {
    form.removeListItem('options', index);
  };

  const handleSubmitPoll = async (values: { title: string; options: PollOption[] }) => {
    setLoading(true);
    const options = values.options.map(option => option.value);

    try {
      const poll = {
        creator: user.uid,
        communityId,
        title: values.title,
        options,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, 'polls'), poll);
      router.back(); // Or any other action after successful submission
    } catch (error: any) {
      console.error('Firestore error', error.message);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ width: '100%' }} p="1rem">
      <form onSubmit={form.onSubmit(handleSubmitPoll)}>
        <TextInput
          required
          placeholder="Poll Title"
          {...form.getInputProps('title')}
        />
        <Text size="sm" mt="md">Options:</Text>
        {form.values.options.map((option, index) => (
          <Group key={option.id} mt="xs" spacing="xs">
            <TextInput
              required
              placeholder={`Option ${index + 1}`}
              {...form.getInputProps(`options.${index}.value`)}
            />
            <Button color="red" onClick={() => removeOption(index)}>
              <IconMinus />
            </Button>
          </Group>
        ))}
        <Button leftIcon={<IconPlus />} onClick={addOption} mt="sm">
          Add Option
        </Button>
        <Divider my="sm" />
        <Group position="right" mt="md">
          <Button loading={loading} type="submit">
            Submit Poll
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default PollForm;
