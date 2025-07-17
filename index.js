const form = document.getElementById("formList");

const preview = {
    container: document.getElementById("resumePreview"),
    photo: document.getElementById("previewPhoto"),
    fullname: document.getElementById("namePreview"),
    contact: document.getElementById("contactPreview"),
    summary: document.getElementById("summaryPreview"),
    education: document.getElementById("educationPreview"),
    workExperience: document.getElementById("experiencePreview"), 
    skills: document.getElementById("skillsPreview"),
};
 const themes ={
    classic: "bg-[#4B8DA8] text-white",
    modern: "bg-[#023D54] text-white",
    creative: "bg-gradient-to-br from-[#C1E899] via-[#E6F0DC] to-[#55883B] text-gray-900"

 };
      form.addEventListener('input', (e) => {
      const data = Object.fromEntries(new FormData(form).entries());
      localStorage.setItem('resumeData', JSON.stringify(data));
      
      preview.fullname.textContent = data.fullname || '';
      preview.contact.textContent = data.contact || '';
      preview.summary.textContent = data.summary || '';
      preview.education.textContent = data.education || '';
      preview.workExperience.textContent = data.workExperience || '';
      preview.skills.textContent = data.skills || '';
      preview.container.className = preview.container.className = `p-6 rounded shadow ${themes[data.theme] || themes.classic}`;

    });
    form.querySelector('input[name="photo"]').addEventListener('change',(e)=>{

      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        preview.photo.src = reader.result;
        preview.photo.classList.remove('hidden');
        const data = JSON.parse(localStorage.getItem('resumeData')) || {};
        data.photo = reader.result;
        localStorage.setItem('resumeData', JSON.stringify(data));
      };
      reader.readAsDataURL(file);
    });

        window.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem('resumeData')) || {};
  Object.keys(saved).forEach(key => {
    if (form[key]) form[key].value = saved[key];
  });

  if (saved.photo) {
    preview.photo.src = saved.photo;
    preview.photo.classList.remove('hidden');
  }

  preview.fullName.textContent = saved.fullName || '';
  preview.contact.textContent = saved.contact || '';
  preview.summary.textContent = saved.summary || '';
  preview.education.textContent = saved.education || '';
  preview.experience.textContent = saved.experience || '';
  preview.skills.textContent = saved.skills || '';

  // ✅ Refresh theme and preview using event
  form.dispatchEvent(new Event('input'));
});

