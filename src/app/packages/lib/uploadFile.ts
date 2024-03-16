export const handleUpload = async (selectedFile:any) => {
    try {
        // console.log('handle upload start');
        
      const formData = new FormData();
      formData.append('file', selectedFile);
      // console.log(formData);
      
const response= await fetch('http://localhost:3001/upload',{
    method:'POST',
   body:formData
})
    //   const response = await axios.post('/api/upload', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   });
//@ts-ignore
// console.log(response.ok,'okkokkokkkko');

     const data= await response.json()
    //  console.log(data);
     
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
