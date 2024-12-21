let form = document.getElementById('editable-resume') as HTMLFormElement;
let resume = document.getElementById('resume-display') as HTMLDivElement;
let shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
let shareableLink = document.getElementById('shareable-link') as HTMLAnchorElement;
let downloadButton = document.getElementById('download-resume') as HTMLButtonElement;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect user input fields
    let Fname = (document.getElementById('name') as HTMLInputElement).value;
    let email = (document.getElementById('email') as HTMLInputElement).value;
    let number = (document.getElementById('number') as HTMLInputElement).value;
    let dob = (document.getElementById('dob') as HTMLInputElement).value;
    let address = (document.getElementById('add') as HTMLInputElement).value;
    let education = (document.getElementById('education') as HTMLInputElement).value;
    let experience = (document.getElementById('experience') as HTMLInputElement).value;
    let skills = (document.getElementById('skills') as HTMLInputElement).value;
    let language = (document.getElementById('language') as HTMLInputElement).value;
    let career = (document.getElementById('career') as HTMLInputElement).value;
    let picFile = (document.getElementById('profilepic') as HTMLInputElement).files?.[0];

    if (!resume) {
        console.error('The resume display element is missing.');
        return;
    }

    // Generate a unique URL based on the user's name
    const baseURL = window.location.origin;
    const uniqueURL = `${baseURL}/resume/${Fname.replace(/\s+/g, '-').toLowerCase()}`;
    shareableLink.href = uniqueURL;
    shareableLink.innerText = uniqueURL;
    shareableLinkContainer.style.display = 'block';

    // Function to generate the resume HTML
    const genResumeHTML = (imgDataURL: string | null) => {
        const resumeHTML = `
            ${imgDataURL ? `<img src="${imgDataURL}" alt="Profile Picture" style="width:150px; height:150px; border-radius:50%;">` : ""}
            <br>
             <h2><b>${Fname}</b></h2>
            <br>
            <h3>Career Objective</h3>
            <br>
            <p>${career}</p>
            <br>
            <h3>Personal Information</h3>
            <br>
            <ul>
                <li><b>Name:</b><span> ${Fname}</span></li>
                <li><b>Email:</b> ${email}</li>
                <li><b>Phone Number:</b> ${number}</li>
                <li><b>Date of Birth:</b> ${dob}</li>
                <li><b>Address:</b> ${address}</li>
            </ul>
            <br>
            <h3>Education</h3>
            <p>${education}</p>
            <br>
            <h3>Experience</h3>
            <p>${experience}</p>
            <br>
            <h3>Skills</h3>
            <p>${skills}</p>
            <br>
            <h3>Languages</h3>
            <p>${language}</p>
        `;
        resume.innerHTML = resumeHTML;
    };

    // Handle the profile picture
    if (picFile) {
        const reader = new FileReader();
        reader.onload = () => {
            genResumeHTML(reader.result as string);
        };
        reader.readAsDataURL(picFile);
    } else {
        genResumeHTML(null);
    }
});

// Download resume as PDF
downloadButton.addEventListener('click', () => {
    if (resume) {
        const options = {
            margin: 0,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 1 },
            jsPDF: { unit: 'px', format: [resume.offsetWidth, resume.offsetHeight] }
        };
        // @ts-ignore
        html2pdf().set(options).from(resume).save();
    }
});
