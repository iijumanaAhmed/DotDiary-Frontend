// import { useEffect, useState } from 'react'
// import axios from 'axios'

// function Tag({ formData, handleChange }) {
//     const [tags, setTags] = useState([])

//     async function retriveTags() {
//         const response = await axios.get('http://127.0.0.1:8000/api/tags/')
//         console.log(response.data)
//         setTags(response.data)
//     }
//     useEffect(() => {
//         retriveTags()
//     }, [])

//     return (
//             <div>
//                 <label htmlFor='status'> Session Tag </label>
//                 {
//                     tags.length
//                         ?
//                         <select value={formData[formData.tag]} onChange={() => { handleChange(tag) }} id='tag' name='tag'>
//                             {
//                                 tags.map(tag => {
//                                     return (
//                                         <option id='tag' name='tag' value={tag.id} key={tag.id}>{tag.tag_name}</option>
//                                     )
//                                 })
//                             }
//                         </select>
//                         :
//                         <p>No Tags Found !!</p>
//                     }
//             </div>
//     )
// }

// export default Tag
