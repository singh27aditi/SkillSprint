import { React, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Loader2Icon, Sparkle } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation';

export default function AddNewCourseDialog({ children }) {
const [loading, setLoading] = useState(false);

const router = useRouter();

    const [formData, setFormData] = useState({
        name:'',
        description:'',
        includeVideo:false,
        chapters:1,
        category:'',
        level:''
    })

    const onHandleInputChange = (field, value) => {
        setFormData((prev) => {
            const updated = { ...prev, [field]: value };
            console.log(updated);
            return updated;
        });
    };



    const onGenerate = async () => {
        console.log(formData)
        const courseId = uuidv4();
        try{
            setLoading(true);
            const result = await axios.post('/api/generate-course-layout', {
                ...formData,
                courseId:courseId
            });
            console.log(result.data);
            setLoading(false);
            router.push('/workspace/edit-course/'+result.data?.courseId);
        }
        catch (e){
            setLoading(false);
            console.log(e);
        }
    }
    
  return (
        <Dialog>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Create new course using AI</DialogTitle>
        <DialogDescription asChild>
            <div className='flex flex-col gap-4 mt-3'>
                <div>
                    <label>Course Name</label>
                    <Input placeholder='Course name' onChange ={(event) => onHandleInputChange('name', event?.target.value)}/>
                </div>
                <div className='mt-2'>
                    <label>Course Description (Optional)</label>
                    <Textarea placeholder='Course description' onChange ={(event) => onHandleInputChange('description', event?.target.value)}/>
                </div>
                <div className='mt-2'>
                    <label>Number of Chapters</label>
                    <Input placeholder='Number of chapters' type='number' onChange ={(event) => onHandleInputChange('chapters', event?.target.value)}/>
                </div>
                <div className='flex gap-3 items-center mt-2'>
                    <label>Include Video</label>
                        <Switch
                            checked={formData.includeVideo}
                            onCheckedChange={(checked) =>
                                onHandleInputChange('includeVideo', checked)
                            }
                        />

                </div>

                <div className='mt-2'>
                    <label>Difficulty Level</label>
                    <Select onValueChange={(value) => onHandleInputChange('level', value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Difficulty Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className='mt-2'>
                    <label>Category</label>
                    <Input placeholder='Category (separated by comma)' onChange ={(event) => onHandleInputChange('category', event?.target.value)}/>
                </div>
                <div className='mt-5'>
                    <Button className={'w-full'} onClick={onGenerate} disabled={loading}>
                        {loading ? <Loader2Icon className='animate-spin'/>:
                        <Sparkle />} Generate Course</Button>
                </div>
            </div>
        </DialogDescription>
        </DialogHeader>
    </DialogContent>
    </Dialog>

  )
}
