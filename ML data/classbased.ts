import React, { useState, useEffect, useRef } from 'react';  
  
interface User {  
  name: string;  
  email: string;  
}  
  
interface UserDataProps {  
  userId: string;  
}  
  
function UserData({ userId }: UserDataProps) {  
  const [user, setUser] = useState<User | null>(null);  
  const [seconds, setSeconds] = useState(0);  
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);  
  
  useEffect(() => {  
    fetchUserData();  
    intervalIdRef.current = setInterval(() => {  
      setSeconds(prevSeconds => prevSeconds + 1);  
    }, 1000);  
  
    return () => {  
      if (intervalIdRef.current) {  
        clearInterval(intervalIdRef.current);  
      }  
    };  
  }, []);  
  
  useEffect(() => {  
    if (userId) {  
      fetchUserData();  
    }  
  }, [userId]);  
  
  const fetchUserData = () => {  
    fetch(`https://secret.url/user/${userId}`)  
      .then(response => response.json())  
      .then((data: User) => setUser(data))  
      .catch(error => console.error('Error fetching user data:', error));  
  };  
  
  return (  
    <div>  
      <h1>User Data Component</h1>  
      {user ? (  
        <div>  
          <p>Name: {user.name}</p>  
          <p>Email: {user.email}</p>  
        </div>  
      ) : (  
        <p>Loading user data...</p>  
      )}  
      <p>Timer: {seconds} seconds</p>  
    </div>  
  );  
}  
  
export default UserData;