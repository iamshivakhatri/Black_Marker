import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export function ResumeForm() {
    // Extend ResumeFormProps to include new fields
    interface ResumeFormProps {
        username: string;
        email: string;
        address: string;
        website: string;
        github: string;
        phoneNumber: string;
        linkedin: string;
    }

    const formSchema = z.object({
        username: z.string().min(2, {
          message: "Username must be at least 2 characters.",
        }),
        email: z.string().email({
          message: "Please enter a valid email address.",
        }),
        address: z.string(), // Add address field validation
        website: z.string().url(), // Add website field validation
        github: z.string(), // Add GitHub field validation
        phoneNumber: z.string(), // Add phone number field validation
        linkedin: z.string(), // Add LinkedIn field validation
    })

    type ResumeFormValues = z.infer<typeof formSchema>;
      
    const form = useForm<ResumeFormValues>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (values: ResumeFormValues) => {
        console.log(values);
    }
      
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                  
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                       
           
                    <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>  
                                        <Input type="email" placeholder="johndoe@gmail.com" {...field}/>
                                    </FormControl>                        
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>  
                                    <Input placeholder="Enter your address" {...field}/>
                                </FormControl>                        
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>  
                                    <Input placeholder="Enter your website URL" {...field}/>
                                </FormControl>                        
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="github"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>GitHub</FormLabel>
                                <FormControl>  
                                    <Input placeholder="Enter your GitHub username" {...field}/>
                                </FormControl>                        
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>  
                                    <Input placeholder="Enter your phone number" {...field}/>
                                </FormControl>                        
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="linkedin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>LinkedIn</FormLabel>
                                <FormControl>  
                                    <Input placeholder="Enter your LinkedIn URL" {...field}/>
                                </FormControl>                        
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}