export const loginUser = async (userData) => {
  try {
    const response = await fetch(
      'https://fakestoreapi.com/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      },
    );

    if (response.ok) {
      return await response.json();
    } else {
      console.error('Server responded with status:', response.status);

      const errorDetails = await response.json();
      console.error('Response details:', errorDetails);

      throw new Error(`Bad request: ${response.status}`);
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
};

export default loginUser;
