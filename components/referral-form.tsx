"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function ReferralForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <Card className="rounded-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-[#0A3C5F]">Rapid Referral</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600 mb-3">Submit a quick referral and we'll contact you within one business day.</p>
        <form onSubmit={async (e)=>{
          e.preventDefault();
          setLoading(true);
          setError("");
          setSent(false);
          
          const formData = new FormData(e.currentTarget);
          const name = formData.get('name') as string;
          const email = formData.get('email') as string;
          const phone = formData.get('phone') as string;
          const referralReason = formData.get('referralReason') as string;
          
          try {
            const response = await fetch('/api/referral', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name,
                email,
                phone,
                referralReason,
              }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
              setSent(true);
              e.currentTarget.reset();
            } else {
              setError(data.error || 'Failed to send referral. Please try again.');
            }
          } catch (err) {
            console.error('Error submitting referral:', err);
            setError('Failed to send referral. Please try again.');
          } finally {
            setLoading(false);
          }
        }} className="space-y-3">
          <Input required placeholder="Your name" name="name" />
          <Input type="email" required placeholder="Email" name="email" />
          <Input placeholder="Phone" name="phone" />
          <Textarea placeholder="Brief reason for referral" rows={4} name="referralReason" />
          <Button type="submit" disabled={loading} className="w-full rounded-2xl">
            {loading ? 'Sending...' : 'Send referral'}
          </Button>
          {sent && <p className="text-sm text-green-700 flex items-center gap-2"><CheckCircle2 className="h-4 w-4"/> Thanks! We'll be in touch shortly.</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </CardContent>
    </Card>
  );
}


