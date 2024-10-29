// Constants
const studentNumber = "s4908734";
const uqcloudZoneId = "e66e009a"; 

// Headers
const headers = new Headers();
headers.append("student_number", studentNumber);
headers.append("uqcloud_zone_id", uqcloudZoneId);

export function logPageLoadmessage() {
  console.log("Page loaded");
}

export function uploadProgress(formData) {
  return fetch(
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
    });
}

export function fetchProgress() {
  return fetch(
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
    });
}