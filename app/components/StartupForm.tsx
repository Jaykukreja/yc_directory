"use client"
import React, { useActionState, useState } from 'react'
import { Input } from '@/components/ui/input'
import MDEditor from '@uiw/react-md-editor';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPitch } from '@/lib/actions';
import { Textarea } from '@/components/ui/textarea';

const StartupForm = () => {

    const [errors, setErrors] = useState<Record<string,string>>({})
    const [pitch, setPitch] = useState("")
    // const {toast} = useToast()
    const router = useRouter()

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        console.log("jijijiji")
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch
            }
            await formSchema.parseAsync(formValues)
            console.log(formValues)
            const result = await createPitch(prevState, formData, pitch)
            console.log(result)
            if(result.status == 'SUCCESS') {
            toast("Success", { 
                description: "Your startup pitch has been created successfully"
              });
            }
            router.push(`/startup/${result._id}`)
            return result
        } catch (error) {
            if (error instanceof z.ZodError) {
              const fieldErorrs = error.flatten().fieldErrors;
      
              setErrors(fieldErorrs as unknown as Record<string, string>);
      
              toast("Error", {
                description: "Please check your inputs and try again",
                duration: 3000, // Optional: Auto dismiss after 3s
              });
      
              return { ...prevState, error: "Validation failed", status: "ERROR" };
            }
      
            toast("Error", {
                description: "An unexpected error has occurred",
                duration: 3000, // Optional: Auto dismiss after 3s
              });
      
            return {
              ...prevState,
              error: "An unexpected error has occurred",
              status: "ERROR",
            };
          }
    }
    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL"
    });
  return (
    <form action={formAction} className="startup-form">
        <div>
            <label htmlFor='title' className='startup-form_label'>
                Title
            </label>
            <Input id="title" name="title" className="startup-form_input" required placeholder="Startup Title" />
            {errors.title && <p className='startup-form_error'>{errors.title}</p>}
        </div>

        <div>
            <label htmlFor='description' className='startup-form_label'>
                Description
            </label>
            <Textarea id="description" name="description" className="startup-form_textarea" required placeholder="Startup Description" />
            {errors.description && <p className='startup-form_error'>{errors.description}</p>}
        </div>
       
        <div>
            <label htmlFor='category' className='startup-form_label'>
                Category
            </label>
            <Input id="category" name="category" className="startup-form_input" required placeholder="Startup Categpry (Tech, Health, Education...)" />
            {errors.category && <p className='startup-form_error'>{errors.category}</p>}
        </div>
        
        <div>
            <label htmlFor='link' className='startup-form_label'>
                Image URL
            </label>
            <Input id="link" name="link" className="startup-form_input" required placeholder="Startup Image URL" />
            {errors.link && <p className='startup-form_error'>{errors.link}</p>}
        </div>
        
        <div data-color-mode="light">
            <label htmlFor='pitch' className='startup-form_label'>
                Pitch
            </label>
            <MDEditor
                value={pitch}
                onChange={(value) => setPitch(value as string)}
                id="pitch"
                preview="edit"
                height={300}
                style={{ borderRadius: 20, overflow: "hidden"}}
                textareaProps={{
                    placeholder: "Breifly describe your idea and what problem it solves"
                }}
                previewOptions={{
                    disallowedElements: ["style"]
                }}
            />
            {errors.pitch && <p className='startup-form_error text-white'>{errors.pitch}</p>}
        </div>
        <button type="submit" className="startup-form_btn flex justify-between w-full px-4" disabled={isPending}>
    <span className="justify-center text-lg text-center text-white">{isPending ? "Submitting..." : "Submit your Pitch"}</span>
    <Send className="size-6 text-white" />
</button>

    </form>
  )
}

export default StartupForm

// "use client"
// import React, { useState, FormEvent } from 'react'
// import { Input } from '@/components/ui/input'
// import MDEditor from '@uiw/react-md-editor'
// import { Send } from 'lucide-react'
// import { formSchema } from '@/lib/validation'
// import { z } from "zod"
// import { toast } from "sonner"
// import { useRouter } from 'next/navigation' // Changed from 'next/router'

// const StartupForm = () => {
//     // State management for form data and errors
//     const [errors, setErrors] = useState<Record<string, string>>({})
//     const [pitch, setPitch] = useState("")
//     const [isSubmitting, setIsSubmitting] = useState(false)
//     const router = useRouter()
//     console.log("inside startup")
    
//     // Form submission handler using standard onSubmit
//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         console.log("koko")
//         e.preventDefault()
//         setIsSubmitting(true)
        
//         try {
//             // Get form data using FormData API
//             const formData = new FormData(e.currentTarget)
            
//             // Create the form values object
//             const formValues = {
//                 title: formData.get("title") as string,
//                 description: formData.get("description") as string,
//                 category: formData.get("category") as string,
//                 link: formData.get("link") as string,
//                 pitch
//             }
//             console.log(formValues)
//             // Validate the form data
//             await formSchema.parseAsync(formValues)
            
//             // Here you would typically make your API call
//             // const result = await createIdea(formValues)
            
//             // Show success message
//             toast("Success", {
//                 description: "Your startup pitch has been created successfully"
//             })
//             console.log(formValues)
            
//             // Navigate to the success page
//             // router.push(`/startup/${result.id}`)
            
//         } catch (error) {
//             // Handle validation errors
//             if (error instanceof z.ZodError) {
//                 const fieldErrors = error.flatten().fieldErrors
//                 setErrors(fieldErrors as unknown as Record<string, string>)
                
//                 toast("Error", {
//                     description: "Please check your inputs and try again",
//                     duration: 3000
//                 })
//             } else {
//                 // Handle unexpected errors
//                 toast("Error", {
//                     description: "An unexpected error occurred",
//                     duration: 3000
//                 })
//             }
//         } finally {
//             setIsSubmitting(false)
//         }
//     }

//     return (
//         <form onSubmit={handleSubmit} className="startup-form">
//             <div>
//                 <label htmlFor="title" className="startup-form_label">
//                     Title
//                 </label>
//                 <Input
//                     id="title"
//                     name="title"
//                     className="startup-form_input"
//                     required
//                     placeholder="Startup Title"
//                 />
//                 {errors.title && (
//                     <p className="startup-form_error">{errors.title}</p>
//                 )}
//             </div>

//             <div>
//                 <label htmlFor="description" className="startup-form_label">
//                     Description
//                 </label>
//                 <Input
//                     id="description"
//                     name="description"
//                     className="startup-form_textarea"
//                     required
//                     placeholder="Startup Description"
//                 />
//                 {errors.description && (
//                     <p className="startup-form_error">{errors.description}</p>
//                 )}
//             </div>

//             <div>
//                 <label htmlFor="category" className="startup-form_label">
//                     Category
//                 </label>
//                 <Input
//                     id="category"
//                     name="category"
//                     className="startup-form_input"
//                     required
//                     placeholder="Startup Category (Tech, Health, Education...)"
//                 />
//                 {errors.category && (
//                     <p className="startup-form_error">{errors.category}</p>
//                 )}
//             </div>

//             <div>
//                 <label htmlFor="link" className="startup-form_label">
//                     Image URL
//                 </label>
//                 <Input
//                     id="link"
//                     name="link"
//                     className="startup-form_input"
//                     required
//                     placeholder="Startup Image URL"
//                 />
//                 {errors.link && (
//                     <p className="startup-form_error">{errors.link}</p>
//                 )}
//             </div>

//             <div data-color-mode="light">
//                 <label htmlFor="pitch" className="startup-form_label">
//                     Pitch
//                 </label>
//                 <MDEditor
//                     value={pitch}
//                     onChange={(value) => setPitch(value as string)}
//                     id="pitch"
//                     preview="edit"
//                     height={300}
//                     style={{ borderRadius: 20, overflow: "hidden" }}
//                     textareaProps={{
//                         placeholder: "Briefly describe your idea and what problem it solves"
//                     }}
//                     previewOptions={{
//                         disallowedElements: ["style"]
//                     }}
//                 />
//                 {errors.pitch && (
//                     <p className="startup-form_error text-white">{errors.pitch}</p>
//                 )}
//             </div>

//             <button
//                 type="submit"
//                 className="startup-form_btn flex justify-between w-full px-4"
//                 disabled={isSubmitting}
//             >
//                 <span className="justify-center text-lg text-center text-white">
//                     {isSubmitting ? "Submitting..." : "Submit your Pitch"}
//                 </span>
//                 <Send className="size-6 text-white" />
//             </button>
//         </form>
//     )
// }

// export default StartupForm