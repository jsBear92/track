import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";

function Category() {
  const [tracks, setTracks] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // Inside your component where you define the form
  const [categoryName, setCategoryName] = useState("");
  const [displayOrder, setDisplayOrder] = useState("");
  let navigate = useNavigate();

  async function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    let category = {
      name: categoryName,
      displayOrder: parseInt(displayOrder),
    };

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    // Optional: Display FormData for debugging
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    // Submit the form data
    await fetch("http://localhost:5241/api/Category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);

        // Optionally close modal and reset form state here
        navigate("/category", { replace: true });
        setCategoryName("");
        setDisplayOrder("");
      })
      .catch((error) => {
        console.error("Error:", error);
        setCategoryName("");
        setDisplayOrder("");
      });
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5241/api/Category");
      const data = await response.json();
      if (Array.isArray(data)) {
        setTracks(data);
      } else {
        console.error("Expected an array but received:", data);
        setTracks([]); // Reset to an empty array if data is not as expected
      }
    };

    fetchData().catch((error) => {
      console.error("Error:", error);
    });
  }, []);

  return (
    <div className="px-8 py-4 w-full">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold">Category List</h1>
        <Button
          onPress={onOpen}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
        >
          Create New Category
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <form method="post" onSubmit={handleSubmit}>
                  <ModalHeader className="flex flex-col gap-1">
                    Create Category
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      label="Category Name"
                      name="Category Name"
                      variant="bordered"
                      value={categoryName}
                      isRequired
                      errorMessage={
                        !categoryName
                          ? "Category Name is required"
                          : ""
                      }
                      onValueChange={setCategoryName}
                    />
                    <Input
                      label="Display Order"
                      name="Display Order"
                      variant="bordered"
                      value={displayOrder}
                      onValueChange={setDisplayOrder}
                      isInvalid={
                        displayOrder > 0 && displayOrder <= 100 ? false : true
                      }
                      errorMessage={
                        displayOrder > 0 && displayOrder <= 100
                          ? ""
                          : "Display Order should be between 1 and 100"
                      }
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose} type="submit">
                      Create
                    </Button>
                  </ModalFooter>
                </form>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-8 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                Category Name
              </th>
              <th className="px-8 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                Display Order
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {tracks.map((track) => (
              <tr key={track.id}>
                <td className="px-8 py-4 whitespace-nowrap text-lg text-gray-900">
                  {track.name}
                </td>
                <td className="px-8 py-4 whitespace-nowrap text-lg text-gray-900">
                  {track.displayOrder}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Category;
