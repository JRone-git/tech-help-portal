import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import emailjs from '@emailjs/browser';

interface QuestionFormProps {
  onClose: () => void;
}

const QuestionForm = ({ onClose }: QuestionFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const result = await emailjs.send(
        'service_oqu2tcp',
        'template_ompea5r',
        {
          to_email: 'seniorinettiapu@gmail.com',
          from_name: name,
          from_email: email,
          message: question,
        },
        'k2i7r_1y2z7O8HkK7'
      );

      if (result.text === 'OK') {
        alert('Kiitos kysymyksestäsi! Vastaamme sinulle pian.');
        onClose();
      } else {
        throw new Error('Lähetys epäonnistui');
      }
    } catch (error) {
      alert('Viestin lähetys epäonnistui. Yritä uudelleen tai ota yhteyttä sähköpostilla.');
      console.error('EmailJS error:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Lähetä kysymys</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2">Nimi</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2">Sähköposti</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="question" className="block mb-2">Kysymys</label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              rows={4}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={sending}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {sending ? 'Lähetetään...' : 'Lähetä'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Peruuta
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuestionForm;
