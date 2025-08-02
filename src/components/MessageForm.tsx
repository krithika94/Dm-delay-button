import React from 'react'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ToastContainer, toast } from 'react-toastify';

const MessageForm = () => {

  const[message,setMessage] = React.useState<string>('');

  const[delay,setDelay]=React.useState<number>(5);
  const[isSending,setIsSending]=React.useState<boolean>(false);
  const[timerId,setTimerId]=React.useState<NodeJS.Timeout | null>(null);
  const[sentMessage,setSentMessage] = React.useState<string>('');
  
  const handleSendMsg = () => {
    setIsSending(true);
    if(!message.trim()) {
      toast.error('Please enter a message');}
    const tId = setTimeout(() => {
      toast.success(`Message sent: "${message}"`);
    setSentMessage(message);
    setMessage('');
    setIsSending(false);
    // toast(sentMessage);
  },delay * 1000)
    setTimerId(tId)
  }
  const handleCancel = () => {
    if(timerId){
      clearTimeout(timerId);
      setIsSending(false);
      toast.info('Message sending cancelled');
    }
  }

  return (
    <div className='max-w-md border-1 rounded-lg p-4 shadow-sm bg-white space-y-4'>
      <h2 className='text-2xl font-bold text-gray-800'>Dm Delay Button</h2>
      <Textarea
        placeholder='Type your message here...' value={message} onChange={(e)=> setMessage(e.target.value)} />

       <div className='flex gap-2'>
        {[10, 30, 60].map((sec) => (
          <Button
            key={sec}
            variant={delay === sec ? 'default' : 'outline'}
            onClick={() => setDelay(sec)}
            disabled={isSending}
          >
            {sec}s
          </Button>
        ))}
      </div>
      {!isSending ? (
      <Button
        variant='default'
        size='lg'
        className='w-full' onClick={handleSendMsg}>Sent with delay</Button>):(
         <Button
        variant='destructive'
        size='lg'
        className='w-full' onClick={handleCancel}>Cancel</Button> 
        )}
       <ToastContainer position="bottom-center" autoClose={3000} />
        {message && !isSending && (
          <div className="border p-2 rounded text-sm text-gray-600 bg-gray-50">
            <strong>Preview:</strong> {message}
          </div>
        )}
    </div>
  )
}

export default MessageForm
