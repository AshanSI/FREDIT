
// import { auth, db } from '../firebase/firebaseConfig'; // Make sure this path matches your Firebase config setup
// import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       const { q: queryText } = req.query;

//       if (typeof queryText !== 'string') {
//         throw new Error('Invalid request');
//       }

//       // Firestore does not natively support case-insensitive searches or the ability to query
//       // related documents in one go, like SQL databases. Therefore, you will need to adjust
//       // your search logic, potentially requiring multiple queries and client-side processing.

//       // Start with a simple query for posts containing the query string in the body
//       const postsRef = collection(db, 'posts');
//       const postsQuery = query(postsRef, where('body', '>=', queryText), where('body', '<=', queryText + '\uf8ff'));
//       const postsQuerySnapshot = await getDocs(postsQuery);

//       let posts = [];

//       // Since Firestore doesn't support directly querying the 'author' object within each post
//       // like a relational database, you need to fetch the author for each post in a separate query.
//       for (const docSnapshot of postsQuerySnapshot.docs) {
//         const postData = docSnapshot.data();
//         const authorRef = doc(db, 'users', postData.authorId);
//         const authorDocSnapshot = await getDoc(authorRef);

//         // Combine post and author data
//         posts.push({
//           ...postData,
//           author: authorDocSnapshot.exists() ? authorDocSnapshot.data() : null,
//         });
//       }

//       // Optionally, save the search query to a 'searchQueries' collection
//       await addDoc(collection(db, 'searchQueries'), {
//         query: queryText,
//         timestamp: new Date(),
//       });

//       res.status(200).json({ posts });
//     } catch (error) {
//       console.error(error);
//       res.status(500).end();
//     }
//   }
// }
