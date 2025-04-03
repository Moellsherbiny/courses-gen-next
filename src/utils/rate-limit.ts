// import rateLimit from "express-rate-limit";
// import {NextRequest, NextResponse} from "next/server";
// const rateLimit = (options: { windowMs: number; max: number; message: string; }) => {
//   const limiter = rateLimit({
//     ...options,
//     handler: (req:NextRequest, res:NextResponse) => {
//       res
//         .status(429)
//         .json({ error: "Too many requests, please try again later." });
//     },
//   });


// };

// export default rateLimit;