"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useAnalytics } from "./analytics";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function ReferralForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const { trackEvent } = useAnalytics();

  return (
    <Card className="rounded-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-[#0A3C5F]">Rapid Referral</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600 mb-3">Submit a quick referral and we'll contact you within one business day.</p>
        <form onSubmit={async (e)=>{
          e.preventDefault();
          const form = e.currentTarget;
          setLoading(true);
          setError("");
          setSent(false);
          
          try {
            const formData = new FormData();
            formData.append('name', (form.querySelector('[name="name"]') as HTMLInputElement)?.value || '');
            formData.append('email', (form.querySelector('[name="email"]') as HTMLInputElement)?.value || '');
            formData.append('phone', (form.querySelector('[name="phone"]') as HTMLInputElement)?.value || '');
            formData.append('referralReason', (form.querySelector('[name="referralReason"]') as HTMLTextAreaElement)?.value || '');
            
            // Add uploaded files
            uploadedFiles.forEach((file, index) => {
              formData.append(`file_${index}`, file);
            });
            
            const response = await fetch('/api/referral', {
              method: 'POST',
              body: formData,
            });
            
            const data = await response.json();
            
            if (response.ok) {
              setSent(true);
              form.reset();
              setUploadedFiles([]);
              trackEvent('form_submit', 'referral', 'success', uploadedFiles.length);
            } else {
              setError(data.error || 'Failed to send referral. Please try again.');
            }
          } catch (err) {
            console.error('Error submitting referral:', err);
            setError('Failed to send referral. Please try again.');
            trackEvent('form_submit', 'referral', 'error');
          } finally {
            setLoading(false);
          }
        }} className="space-y-3">
          <Input required placeholder="Your name" name="name" />
          <Input type="email" required placeholder="Email" name="email" />
          <Input placeholder="Phone" name="phone" />
          <Textarea placeholder="Brief reason for referral" rows={4} name="referralReason" />
          
          {/* File Upload Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Attach documents (optional)</label>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setFileError("");
                
                // Validate file types and sizes
                const validTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.txt'];
                const maxSize = 10 * 1024 * 1024; // 10MB
                
                for (const file of files) {
                  const ext = '.' + file.name.split('.').pop()?.toLowerCase();
                  if (!validTypes.includes(ext)) {
                    setFileError("PDF, DOC, DOCX, JPG, PNG, TXT files up to 10MB each");
                    setUploadedFiles([]);
                    return;
                  }
                  if (file.size > maxSize) {
                    setFileError("PDF, DOC, DOCX, JPG, PNG, TXT files up to 10MB each");
                    setUploadedFiles([]);
                    return;
                  }
                }
                
                setUploadedFiles(files);
              }}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#E6F4F2] file:text-[#0A3C5F] hover:file:bg-[#22A39A] hover:file:text-white"
            />
            {fileError && <p className="text-xs text-red-600">{fileError}</p>}
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


