import { useState, ChangeEvent, FormEvent } from 'react';
import { FormData } from '@/types';

export const useForm = (initialState: FormData) => {
  const [formData, setFormData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData(initialState);
  };

  return {
    formData,
    submitted,
    handleChange,
    handleSubmit,
  };
};