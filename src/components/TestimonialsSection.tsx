import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Alice",
    text: "This platform is amazing! I love the games and the community.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    name: "Bob",
    text: "The UI is so smooth and the games are super fun!",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    name: "Charlie",
    text: "I improved my memory and had a blast competing with friends.",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    name: "Diana",
    text: "The leaderboard keeps me motivated to play more!",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg"
  },
];

const SLIDE_INTERVAL = 3000;

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex justify-center items-center w-full">
      <div
        className="relative overflow-hidden flex items-center justify-center w-full"
        style={{ height: '20%' }}
      >
        <div
          className="flex transition-transform duration-700"
          style={{
            transform: `translateX(-${current * 100}%)`,
            width: `${testimonials.length * 100}%`,
          }}
        >
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 flex flex-col items-center justify-center rounded-xl shadow-2xl p-4 backdrop-blur-md relative overflow-hidden"
              style={{
                width: '100%',
                minWidth: '100%',
                height: '120px',
                background: 'rgba(30,41,59,0.55)', // glass effect
                color: '#fff',
                border: '2px solid #0ea5e9', // neon blue border
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              }}
            >
              {/* Purple blur background */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: 'radial-gradient(circle at 70% 30%, rgba(168,85,247,0.35) 0%, rgba(168,85,247,0.15) 60%, transparent 100%)',
                  filter: 'blur(32px)',
                  pointerEvents: 'none',
                }}
              />
              <div className="flex flex-col items-center mb-2 z-10">
                <Avatar className="w-8 h-8 border-2 border-neon-blue mb-1">
                  <AvatarImage src={t.avatar} />
                  <AvatarFallback>{t.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-base font-bold text-neon-blue">{t.name}</span>
              </div>
              <p className="text-sm font-semibold text-center z-10">"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
