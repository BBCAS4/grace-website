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
        <form onSubmit={(e)=>{
          e.preventDefault();
          setLoading(true);
          setError("");
          const formData = new FormData(e.currentTarget);
          const firstName = formData.get('firstName') as string;
          const lastName = formData.get('lastName') as string;
          const email = formData.get('email') as string;
          const phone = formData.get('phone') as string;
          const message = formData.get('message') as string;
          
          const subject = `Contact from ${firstName} ${lastName}`;
          const body = `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
          
          const mailtoLink = `mailto:NP@GRACEIntegratedHealth.com.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          window.open(mailtoLink);
          
          setSent(true);
          setLoading(false);
          if (e.currentTarget) {
            e.currentTarget.reset();
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


