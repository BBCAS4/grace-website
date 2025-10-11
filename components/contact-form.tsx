"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <Card className="rounded-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-[#0A3C5F]">Send a message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={async (e)=>{
          e.preventDefault();
          setLoading(true);
          setError("");
          setSent(false);
          
          const formData = new FormData(e.currentTarget);
          const firstName = formData.get('firstName') as string;
          const lastName = formData.get('lastName') as string;
          const email = formData.get('email') as string;
          const phone = formData.get('phone') as string;
          const message = formData.get('message') as string;
          
          try {
            const response = await fetch('/api/contact', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                firstName,
                lastName,
                email,
                phone,
                message,
              }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
              setSent(true);
              e.currentTarget.reset();
            } else {
              setError(data.error || 'Failed to send message. Please try again.');
            }
          } catch (err) {
            console.error('Error submitting form:', err);
            setError('Failed to send message. Please try again.');
          } finally {
            setLoading(false);
          }
        }} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input required placeholder="First name" name="firstName"/>
            <Input required placeholder="Last name" name="lastName"/>
          </div>
          <Input type="email" required placeholder="Email" name="email"/>
          <Input placeholder="Phone" name="phone"/>
          <Textarea placeholder="How can we help?" rows={4} name="message"/>
          <Button type="submit" disabled={loading} className="rounded-2xl w-full">
            {loading ? 'Sending...' : 'Submit'}
          </Button>
          {sent && <p className="text-sm text-green-700 flex items-center gap-2"><CheckCircle2 className="h-4 w-4"/> Thanks! Your message has been sent.</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </CardContent>
    </Card>
  );
}


