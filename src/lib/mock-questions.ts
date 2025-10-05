export const mockQuestions = [
  {
    id: 1,
    title: "How to center a div in CSS?",
    author: "Alice",
    time: "2 hours ago",
    tags: ["css", "html", "beginner"],
    status: "unanswered",
    replies: 2,
    views: 30,
    content: "I've tried everything: `margin: auto`, `text-align: center`, flexbox with `justify-content` and `align-items`. Nothing seems to work for my specific layout. Here is my code snippet...",
    answers: [
        {
            id: 1,
            author: "Bob",
            time: "1 hour ago",
            content: "Flexbox should work. Can you show us your HTML structure? Make sure the parent container has `display: flex`."
        },
        {
            id: 2,
            author: "Charlie",
            time: "30 minutes ago",
            content: "For absolute centering, I always use `display: grid; place-items: center;` on the parent. It's foolproof."
        }
    ]
  },
  {
    id: 2,
    title: "Next.js 14 `useRouter` not working in Server Components",
    author: "Bob",
    time: "1 day ago",
    tags: ["nextjs", "react", "routing"],
    status: "solved",
    replies: 5,
    views: 150,
    content: "I'm getting an error that `useRouter` can only be used in client components. How can I navigate programmatically on the server?",
    answers: []
  },
  {
    id: 3,
    title: "How to handle authentication with Supabase?",
    author: "Charlie",
    time: "3 days ago",
    tags: ["supabase", "auth", "javascript"],
    status: "unanswered",
    replies: 0,
    views: 15,
    content: "I'm new to Supabase and trying to set up email/password authentication. The documentation is a bit confusing. Can someone provide a simple example?",
    answers: []
  },
];
