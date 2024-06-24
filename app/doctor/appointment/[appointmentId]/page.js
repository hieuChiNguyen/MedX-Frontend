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
  const [fileUpload, setFileUpload] = useState(null)
  const [fileUrls, setFileUrls] = useState([])
  const [showModal, setShowModal] = useState(false);
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
          // Extract file extension
          const fileExtension = fileUpload.name.split(".").pop()

          // Add extension to fileUrls
          setFileUrls((prev) => [...prev, { url, extension: fileExtension }])
          handleResult('files', url);
        });
      })
      .catch((error) => {
        console.error(error);
      });
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

    if (fileUpload) {
      uploadFile()
    }
  }, [fileUpload]);


  const updateResultExam = async() => {
    try {
      let response = await doctorApi.updateResultExam(result)

      // Success to update appointment result
      if (response.data && (response.errCode === 0 || response.errCode === 1) ) {
          toasts.successTopRight('Cập nhật kết quả khám thành công.')
          setShowModal(false)
      }

      if (response.errCode !== 0 && response.errCode !== 1) {
          toasts.errorTopRight(response.message)
      }
    } catch (error) {
        console.log(error)
    }
  }

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <main>
        <Header />
        <section className="mx-auto w-[80%]">
            <h1 className="font-semibold my-5 text-xl">Bác sĩ cập nhật kết quả khám bệnh ở đây</h1>
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
                <p className="font-semibold">Tải file kết quả khám</p>
                <input
                    type="file"
                    onChange={(e) => {
                      setFileUpload(e.target.files[0])
                    }}
                />
                <button onClick={openModal} className="border bg-blue-300 p-2 rounded-lg my-10">
                    Cập nhật kết quả khám
                </button>
            </div>
        </section>

        {/* Modal */}
        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="fixed inset-0 bg-black opacity-30"></div>
              <div className="relative bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-xl font-semibold mb-4">Xác nhận cập nhật kết quả khám</h2>
                <p className="mb-4">Bạn chắc chắn muốn cập nhật kết quả khám?</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => { updateResultExam(); }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
                  >
                    Xác nhận
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <ToastContainer />
    </main>
  );
}

export default DetailDoctorAppointmentPage;
