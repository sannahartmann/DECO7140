// Constants
const studentNumber = "s4908734";
const uqcloudZoneId = "e66e009a"; 

// Headers
const headers = new Headers();
headers.append("student_number", studentNumber);
headers.append("uqcloud_zone_id", uqcloudZoneId);

function logPageLoadmessage() {
  console.log("Page loaded");
}

function uploadProgress(formData, handleSuccess, handleError) {
  fetch(
    "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericproduct/",
    {
      method: "POST",
      headers: headers,
      body: formData,
    }
  )
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          console.error("Server error response:", text);
          throw new Error("Server error occurred");
        });
      }
      return response.json();
    })
    .then((result) => {
      console.log("Progress uploaded", result);
      handleSuccess(result);
    })
    .catch((error) => {
      console.error("Error", error.message);
      handleError(error);
    });
}

function fetchProgress(displayProgress, handleGETError) {
  fetch(
    "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericproduct/",
    {
      method: "GET",
      headers: headers,
      redirect: "follow",
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      displayProgress(data);
    })
    .catch((error) => {
      handleGETError(error);
    });
}

export {
  logPageLoadmessage,
  uploadProgress,
  fetchProgress,
  headers,
};