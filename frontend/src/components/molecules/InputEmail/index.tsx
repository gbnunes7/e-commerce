'use client';

import Button from '@/components/atoms/Button';
import { FormEvent, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';

const InputEmail = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 bg-transparent border border-white rounded-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 pr-12"
          required
        />
        <Button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-white/10"
        >
          <BsArrowRight className="h-5 w-5 text-white" />
        </Button>
      </form>
    </div>
  );
};

export default InputEmail;
