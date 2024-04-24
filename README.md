Courseify is a modern course-selling platform that offers a seamless experience for users and course creators alike. With its user-friendly interfaces and integration of cutting-edge technologies, Courseify aims to revolutionize online learning.

Accessible to all, Courseify provides a diverse range of courses covering various topics. Our platform prioritizes innovation, constantly exploring new technologies to enhance the learning experience.

At its core, Courseify fosters collaboration and community engagement, offering interactive tools like live chat sessions and discussion forums.

### NextAuth Integration: Users can easily log in using NextAuth, enabling a smooth authentication process.
### Course Browsing: Users can browse through a wide range of courses, filter them based on various criteria, and explore detailed course descriptions.
### Course Details: Detailed course descriptions include the course title, description, information about the teacher, course content, sections, and more.
### Payment Gateway Integration: Courseify integrates Stripe payment gateway, allowing users to securely purchase courses using their credit or debit cards.
### Course Access: Upon successful purchase, users are redirected to the purchased course, where they can access course sections, units, and associated videos.
### Progress Tracking: Course progress meters indicate the completion status of course units, automatically updating as users complete units.
### Monorepo Structure
### Shared Packages: Courseify utilizes a monorepo structure, enabling the sharing of packages and components across both frontend and backend applications.
Backend
### HTTP Backend: Courseify includes a robust HTTP backend built with Node.js and Next.js, providing efficient handling of user requests and course management functionalities.
### Chat Backend: In addition to the HTTP backend, Courseify features a chat backend where users can engage in discussions related to various study topics. The backend utilizes Redis pub/sub for scalable message handling.
### Email Integration: Nodemailer is integrated into Courseify for sending emails, facilitating communication with users. BullMQ is employed for processing email messages in a queue-based system, ensuring efficient handling of email tasks.

### Technologies Used
Frontend: Next.js, TypeScript, Tailwind CSS
Backend: Node.js, Next.js, TypeScript
Database: PostgreSQL
Authentication: NextAuth
Payment Gateway: Stripe
Chat Backend: Node.js, Redis
Email: Nodemailer, BullMQ


