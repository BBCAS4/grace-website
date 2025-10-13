"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useAnalytics } from "./analytics";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { trackEvent } = useAnalytics();

  return (
    <Card className="rounded-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-[#0A3C5F]">Send a message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={async (e)=>{
          e.preventDefault();
          const form = e.currentTarget;
          setLoading(true);
          setError("");
          setSent(false);
          
          try {
            const formData = new FormData();
            formData.append('firstName', (form.querySelector('[name="firstName"]') as HTMLInputElement)?.value || '');
            formData.append('lastName', (form.querySelector('[name="lastName"]') as HTMLInputElement)?.value || '');
            formData.append('email', (form.querySelector('[name="email"]') as HTMLInputElement)?.value || '');
            formData.append('phone', (form.querySelector('[name="phone"]') as HTMLInputElement)?.value || '');
            formData.append('message', (form.querySelector('[name="message"]') as HTMLTextAreaElement)?.value || '');
            
            // Add uploaded files
            uploadedFiles.forEach((file, index) => {
              formData.append(`file_${index}`, file);
            });
            
            const response = await fetch('/api/contact', {
              method: 'POST',
              body: formData,
            });
            
            const data = await response.json();
            
            if (response.ok) {
              setSent(true);
              form.reset();
              setUploadedFiles([]);
              trackEvent('form_submit', 'contact', 'success', uploadedFiles.length);
            } else {
              setError(data.error || 'Failed to send message. Please try again.');
            }
          } catch (err) {
            console.error('Error submitting form:', err);
            setError('Failed to send message. Please try again.');
            trackEvent('form_submit', 'contact', 'error');
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
          
          {/* File Upload Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Attach documents (optional)</label>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setUploadedFiles(files);
              }}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#E6F4F2] file:text-[#0A3C5F] hover:file:bg-[#22A39A] hover:file:text-white"
            />
            <p className="text-xs text-slate-500">PDF, DOC, DOCX, JPG, PNG, TXT files up to 10MB each</p>
            {uploadedFiles.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium text-slate-700">Selected files:</p>
                <ul className="text-sm text-slate-600">
                  {uploadedFiles.map((file, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <span>{file.name}</span>
                      <span className="text-slate-400">({(file.size / 1024 / 1024).toFixed(1)}MB)</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
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


