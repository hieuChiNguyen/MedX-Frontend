'use client'
import { useState, useEffect } from "react"
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage"
import { storage } from "../../../../firebase/firebase"
import Header from "../../../components/common/Header"
import doctorApi from "../../../api/doctor/DoctorApi"
import { useSelector } from "react-redux"
import toasts from '../../../components/common/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function DetailDoctorAppointmentPage({params}) {
  const appointmentId = params.appointmentId
  const auth = useSelector((state) => state.auth)
  const [fileUpload, setFileUpload] = useState(null);
  const [fileUrls, setFileUrls] = useState([]);
  const [result, setResult] = useState({
    appointmentId: appointmentId,
    doctorId: auth.doctorId,
    description: '',
    files: '',
  })

  const handleResult = (fieldName, value) => {
    setResult({
        ...result,
        [fieldName]: value
    });
};

  const filesListRef = ref(storage, "files/");

  const uploadFile = () => {
    if (fileUpload == null) return;

    const fileRef = ref(storage, `files/${fileUpload.name}`); // Preserve original filename

    uploadBytes(fileRef, fileUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log("check url::", url);

          // Extract file extension
          const fileExtension = fileUpload.name.split(".").pop()

          // Add extension to fileUrls
          setFileUrls((prev) => [...prev, { url, extension: fileExtension }])
          handleResult('files', latestFileUrl)
        });
      })
      .catch((error) => {
        console.error(error);
        alert("Upload failed!")
      });
    alert("Upload success.")
  };

  useEffect(() => {
    listAll(filesListRef)
      .then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            // Extract extension from item.name (assuming filenames have extensions)
            const fileExtension = item.name.split(".").pop();

            setFileUrls((prev) => [...prev, { url, extension: fileExtension }]);
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const latestFileUrl = fileUrls.length > 0 ? fileUrls[fileUrls.length - 1].url : '';

  const updateResultExam = async() => {
    try {
      let response = await doctorApi.updateResultExam(result)

      console.log('check res::', response);

      // Success to create new user
      if (response.data && response.errCode === 0) {
          toasts.successTopRight('Cập nhật kết quả thành công.')
      }

      if (response.errCode !== 0) {
          toasts.errorTopRight(response.message)
      }
    } catch (error) {
        console.log(error)
    }
  }

  console.log('check result::', result);

  return (
    <main>
        <Header />
        <section className="mx-auto w-[80%]">
            <h1 className="font-semibold my-5 text-xl">Bác sĩ cập nhật kết quả khám bệnh ở đây</h1>
            <div className="my-10">
                Thông tin bệnh của bệnh nhân ở đây
            </div>
            <div className="flex flex-col gap-2">
                <p className="my-2 font-semibold">Kết quả chẩn đoán của bác sĩ</p>
                <textarea 
                    rows={10} 
                    className="border hover:outline-blue-400 w-full focus-visible:outline-blue-400"
                    placeholder=""
                    id='description'
                    name='description'
                    value={result.description}
                    onChange={(e) => handleResult('description', e.target.value)}
                > 
                </textarea>
            </div>

            <div className="flex flex-col gap-5 my-10">
                <p>Tải file kết quả khám</p>
                <input
                    type="file"
                    onChange={(e) => {
                      setFileUpload(e.target.files[0])
                      // handleResult('files', e.target.files[0])
                    }}
                />
                <button onClick={uploadFile} className="border bg-blue-300 p-2 rounded-lg my-2 w-40">
                    Tải tệp lên
                </button>
                {/* {fileUrls.map((urlObj, index) => (
                    <p key={index}>
                    {urlObj.url} ({urlObj.extension})
                    </p>
                ))} */}
                {latestFileUrl && (
                  <div>
                    <p>Link tệp mới nhất:</p>
                    <a href={latestFileUrl}>{latestFileUrl}</a>
                  </div>
                )}
                <button onClick={updateResultExam} className="border bg-blue-300 p-2 rounded-lg my-10">
                    Cập nhật kết quả khám
                </button>
            </div>
        </section>
        <ToastContainer />
    </main>
  );
}

export default DetailDoctorAppointmentPage;
