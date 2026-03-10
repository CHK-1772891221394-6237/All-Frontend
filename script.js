// Landing Page Buttons
const landing = document.getElementById('landing-page');
const studentDashboard = document.getElementById('student-dashboard');
const adminDashboard = document.getElementById('admin-dashboard');

document.getElementById('student-btn').onclick = ()=>{
  landing.classList.add('hidden');
  studentDashboard.classList.remove('hidden');
};

document.getElementById('admin-btn').onclick = ()=>{
  landing.classList.add('hidden');
  adminDashboard.classList.remove('hidden');
};

document.getElementById('back-student').onclick = ()=>{
  studentDashboard.classList.add('hidden');
  landing.classList.remove('hidden');
};

document.getElementById('back-admin').onclick = ()=>{
  adminDashboard.classList.add('hidden');
  landing.classList.remove('hidden');
};

// Student Feature Data
const studentFeatures = {
  profile: `<div class="feature-card"><b>Name:</b> Mahii<br/><b>ID:</b> 2026ST001<br/><b>Course:</b> AI & DS</div>`,
  timetable: `<div class="feature-card"><b>Mon:</b> Math 9AM<br/><b>Tue:</b> AI 11AM<br/><b>Wed:</b> Data Science 2PM</div>`,
  "academic-calendar": `<div class="feature-card"><h4>📅 Academic Calendar - March 2026</h4>
                        <table>
                          <tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>
                          <tr><td></td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr>
                          <tr><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td></tr>
                          <tr><td>14</td><td>15<br/><span class="event">AI Assignment</span></td><td>16</td><td>17</td><td>18</td><td>19</td><td>20<br/><span class="event">DS Project</span></td></tr>
                          <tr><td>21</td><td>22</td><td>23</td><td>24</td><td>25<br/><span class="event">Exam</span></td><td>26</td><td>27</td></tr>
                          <tr><td>28</td><td>29</td><td>30</td><td>31</td><td></td><td></td><td></td></tr>
                        </table></div>`,
  assignments: `<div class="feature-card"><b>AI Assignment 1:</b> 15-Mar<br/><b>DS Project:</b> 20-Mar</div>`,
  notifications: `<div class="feature-card">📢 Library opens 8AM<br/>📢 Exam on 25-Mar</div>`,
  fees: `<div class="feature-card"><h4>💰 Fee Structure</h4>
         <table>
           <tr><th>Fee Type</th><th>Amount (₹)</th></tr>
           <tr><td>Tuition</td><td>50,000</td></tr>
           <tr><td>Hostel</td><td>15,000</td></tr>
           <tr><td>Library</td><td>2,000</td></tr>
           <tr><td>Total Pending</td><td>0</td></tr>
         </table></div>`
};

const studentFeatureDisplay = document.getElementById('student-feature-display');

document.querySelectorAll('#student-dashboard .menu-btn').forEach(btn=>{
  btn.onclick = ()=>{
    const feature = btn.getAttribute('data-feature');
    studentFeatureDisplay.innerHTML = studentFeatures[feature] || `<div class="feature-card">No Data</div>`;
  };
});

// Simple Chat Functionality
const studentChatBox = document.getElementById('student-chat');
document.getElementById('student-send').onclick = ()=>{
  const input = document.getElementById('student-input');
  if(input.value.trim() === '') return;
  const msg = document.createElement('div');
  msg.className = 'message user-message';
  msg.innerText = input.value;
  studentChatBox.appendChild(msg);
  studentChatBox.scrollTop = studentChatBox.scrollHeight;
  input.value = '';

  // Simple bot reply
  setTimeout(()=>{
    const botMsg = document.createElement('div');
    botMsg.className = 'message bot-message';
    botMsg.innerText = "Admin Bot: Your query has been noted!";
    studentChatBox.appendChild(botMsg);
    studentChatBox.scrollTop = studentChatBox.scrollHeight;
  },500);
};

// Admin feature placeholder
document.getElementById('admin-feature-display').innerHTML = `
  <div class="feature-card">📢 Hackathon on 12-Apr</div>
  <div class="feature-card">👤 Total Students: 120</div>
  <div class="feature-card">Courses: AI & DS, Data Science</div>
`;

const studentChatBot = document.getElementById('student-chat');
const studentInput = document.getElementById('student-input');

document.getElementById('student-send').onclick = async () => {
    const msg = studentInput.value.trim();
    if(!msg) return;

    // Show user message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user-message';
    userMsg.innerText = msg;
    studentChatBox.appendChild(userMsg);
    studentChatBox.scrollTop = studentChatBox.scrollHeight;
    studentInput.value = '';

    try {
        const res = await fetch("http://127.0.0.1:5000/", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({message: msg, student_id: "student_1"})
        });
        const data = await res.json();
        const botMsg = document.createElement('div');
        botMsg.className = 'message bot-message';
        botMsg.innerText = data.response;
        studentChatBox.appendChild(botMsg);
        studentChatBox.scrollTop = studentChatBox.scrollHeight;
    } catch(err) {
        console.error(err);
    }
};

async function loadFeature(feature){

try{

let res = await fetch(`http://127.0.0.1:5000/student/feature/${feature}`);

let data = await res.json();

console.log(data);

document.getElementById("feature-output").innerHTML =
"<pre>"+JSON.stringify(data,null,2)+"</pre>";

}

catch(error){

console.log("Error:",error);

}

}

