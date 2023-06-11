// import { Feedback } from '../models/feedback.mjs';

// export async function createReview(req, res, next) {
//   try {
//     const { username, user_id, plan_name, plan_id, stars } = req.body;
//     const feedback = new Feedback(username, user_id, plan_name, plan_id, stars);


//     // Example response
//     res.status(200).json({ message: 'Review created successfully' });
//   } catch (error) {
//     next(error);
//   }
// }

// export async function createComplaintForm(req, res, next) {
//   try {
//     const { username, user_id, plan_name, plan_id } = req.body;
//     const feedback = new Feedback(username, user_id, plan_name, plan_id);


//     // Example response
//     res.status(200).json({ message: 'Complaint form submitted successfully' });
//   } catch (error) {
//     next(error);
//   }
// }
