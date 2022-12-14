export const NotifyNewScheduleToUsers = async (emails: string[] = []) => {
   try {
      const response = await fetch('http://localhost:4000/api/create-consultation', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ users_email: emails })
      });
      return await await response.json();
   } catch (error) {
      return error
   }
}