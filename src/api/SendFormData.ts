type FormData = {
    name: string;
    email: string;
  };
  
  export const sendFormData = async (data: FormData): Promise<{ success: boolean }> => {
    try {
      const response = await fetch('https://example.com/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) throw new Error('Ошибка при отправке');
  
      return { success: true };
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      return { success: false };
    }
  };