import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Github, ExternalLink, Linkedin, Mail, Download, ArrowUp, Code, Server, Database, CheckCircle2, Award } from 'lucide-react';
import './App.css';
import axios from 'axios';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);

  // Dynamic text animation
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = ['Software Development Engineer in Test', 'Automation Specialist', 'Full-Stack Developer'];

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % phrases.length;
      const fullText = phrases[current];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(() => {
      handleTyping();
    }, isDeleting ? typingSpeed / 2 : typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, phrases]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/submit-form', formData);
      alert('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-10 transition-colors duration-300 ${darkMode ? 'bg-gray-900/80 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md shadow-sm'}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <span className="text-indigo-500">&lt;</span>
            <span>Tarun</span>
            <span className="text-indigo-500">/&gt;</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <button onClick={() => scrollToSection(aboutRef)} className="hover:text-indigo-500 transition-colors">About</button>
            <button onClick={() => scrollToSection(skillsRef)} className="hover:text-indigo-500 transition-colors">Skills</button>
            <button onClick={() => scrollToSection(experienceRef)} className="hover:text-indigo-500 transition-colors">Experience</button>
            <button onClick={() => scrollToSection(educationRef)} className="hover:text-indigo-500 transition-colors">Education</button>
            <button onClick={() => scrollToSection(certificationsRef)} className="hover:text-indigo-500 transition-colors">Certifications</button>
            <button onClick={() => scrollToSection(contactRef)} className="hover:text-indigo-500 transition-colors">Contact</button>
          </div>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}>
        <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 flex flex-col items-start justify-center">
            <p className="text-indigo-500 font-medium mb-2">Hello, I'm</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tarun Venkata Reddy Ramireddy</h1>
            <div className="h-8 mb-6">
              <span className="text-xl md:text-2xl font-medium">
                <span className="text-indigo-500">{text}</span>
                <span className="animate-blink">|</span>
              </span>
            </div>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-lg">
              Skilled software professional with 2.5 years of experience in test automation, backend technologies, and cloud infrastructure.
            </p>
            <div className="flex space-x-4">
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection(contactRef); }} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
                Get in Touch
              </a>
              <a href="/resume.pdf" download="TarunRamireddyResume.pdf" className="px-6 py-3 border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-md transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300 flex items-center">
                <Download size={18} className="mr-2" /> Resume
            </a>

            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <div className={`w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 ${darkMode ? 'border-indigo-500 shadow-lg shadow-indigo-500/20' : 'border-indigo-400 shadow-xl'}`}>
              <img 
                src="https://img.stablecog.com/insecure/1536w/aHR0cHM6Ly9iLnN0YWJsZWNvZy5jb20vNDAxZjVjZTQtYzM4MC00MzI4LWJkMDYtZjkyZWI3NjE5Y2Q2LmpwZWc.webp" 
                alt="Tarun Ramireddy" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-indigo-500 mx-auto"></div>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <img 
                src="https://images.ctfassets.net/63bmaubptoky/8e6EHyyhZoA2rEb_gcW_Wqp1UYa-QFOfol6A_hLTDo4/d07539f9788941b43e301c741bc144ce/what-is-software-CA-Capterra-Header.png" 
                alt="Working on code" 
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
              <p className="mb-6 opacity-90">
                I'm a Software Development Engineer in Test with 2.5 years of hands-on experience in test automation, backend technologies, and cloud infrastructure. I specialize in building and optimizing test automation frameworks, enhancing system performance, and working with various technologies.
              </p>
              <p className="mb-6 opacity-90">
                My expertise includes tools like Selenium, Cypress, and AWS, with proficiency in languages such as Java, Python, and JavaScript. I'm passionate about creating efficient, scalable solutions and continuously expanding my technical skills.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-indigo-400' : 'bg-indigo-500'} mr-2`}></div>
                  <span>Test Automation</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-indigo-400' : 'bg-indigo-500'} mr-2`}></div>
                  <span>Backend Development</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-indigo-400' : 'bg-indigo-500'} mr-2`}></div>
                  <span>Cloud Infrastructure</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-indigo-400' : 'bg-indigo-500'} mr-2`}></div>
                  <span>Web Development</span>
                </div>
              </div>
              <div className="flex space-x-4">
                <a href="https://github.com/tarunramireddy" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/tarun-ramireddy333/" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
                  <Linkedin size={20} />
                </a>
                <a href="mailto:ramireddytarun@gmail.com" className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
            <div className="w-20 h-1 bg-indigo-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Programming Languages */}
            <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl transform hover:-translate-y-2 transition-transform duration-300`}>
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-indigo-500/20 mr-4">
                  <Code size={24} className="text-indigo-500" />
                </div>
                <h3 className="text-xl font-bold">Programming Languages</h3>
              </div>
              <div className="space-y-4">
                {['Java', 'Python', 'JavaScript'].map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span>{skill}</span>
                      <span className="text-indigo-500">
                        {[90, 85, 80][index]}%
                      </span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className="h-full rounded-full bg-indigo-500" 
                        style={{ width: `${[90, 85, 80][index]}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tools & Technologies */}
            <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl transform hover:-translate-y-2 transition-transform duration-300`}>
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-indigo-500/20 mr-4">
                  <Server size={24} className="text-indigo-500" />
                </div>
                <h3 className="text-xl font-bold">Tools & Technologies</h3>
              </div>
              <div className="space-y-4">
                {['Selenium WebDriver', 'Cypress', 'Jenkins', 'AWS', 'Git/GitHub'].map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span>{skill}</span>
                      <span className="text-indigo-500">
                        {[95, 85, 80, 85, 90][index]}%
                      </span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className="h-full rounded-full bg-indigo-500" 
                        style={{ width: `${[95, 85, 80, 85, 90][index]}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Web Development */}
            <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl transform hover:-translate-y-2 transition-transform duration-300`}>
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-indigo-500/20 mr-4">
                  <Database size={24} className="text-indigo-500" />
                </div>
                <h3 className="text-xl font-bold">Web Development</h3>
              </div>
              <div className="space-y-4">
                {['HTML/CSS', 'Node.js', 'Express.js', 'MySQL', 'REST APIs'].map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span>{skill}</span>
                      <span className="text-indigo-500">
                        {[85, 80, 75, 85, 90][index]}%
                      </span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className="h-full rounded-full bg-indigo-500" 
                        style={{ width: `${[85, 80, 75, 85, 90][index]}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section ref={experienceRef} className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
            <div className="w-20 h-1 bg-indigo-500 mx-auto"></div>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-indigo-500"></div>
            
            {/* Experience 1 */}
            <div className="relative mb-16">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                  <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} md:ml-auto transform hover:-translate-y-2 transition-transform duration-300`}>
                    <h3 className="text-xl font-bold mb-2">Software Development Engineer in Test</h3>
                    <p className="text-indigo-500 mb-2">Cognizant Technology Solutions, Hyderabad</p>
                    <p className="opacity-90 mb-2">Aug 2023 - July 2024</p>
                    <ul className="list-disc list-inside opacity-90 space-y-2">
                      <li>Developed modular automation framework, increasing script reusability by 40% and scalability by 30% using Selenium WebDriver</li>
                      <li>Developed test data automation using Apache POI, achieving 90% coverage and reducing manual efforts by 50%</li>
                      <li>Automated backend marketing enrichments using JavaScript portlets, improving efficiency by 50%</li>
                      <li>Awarded the Global Impact Award for automating workflows, reducing manual effort by 50%</li>
                    </ul>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} border-4 border-indigo-500`}></div>
                </div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>
            </div>
            
            {/* Experience 2 */}
            <div className="relative mb-16">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right"></div>
                <div className="absolute left-0 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} border-4 border-indigo-500`}></div>
                </div>
                <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0">
                  <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transform hover:-translate-y-2 transition-transform duration-300`}>
                    <h3 className="text-xl font-bold mb-2">Automation Test Engineer</h3>
                    <p className="text-indigo-500 mb-2">Cognizant Technology Solutions, Hyderabad</p>
                    <p className="opacity-90 mb-2">Aug 2022 - July 2023</p>
                    <ul className="list-disc list-inside opacity-90 space-y-2">
                      <li>Built 150+ automated scripts with Selenium, reducing defects by 15%</li>
                      <li>Improved testing efficiency and accuracy for product offering catalogues by 25% by enhancing static objects into variables during new configuration changes</li>
                      <li>Enhanced test coverage to 80% by addressing critical gaps in functional and regression testing</li>
                      <li>Resolved 60+ critical defects, maintaining software stability and improving release speed by 25%</li>
                      <li>Received the Star Performer Award for increasing automation efficiency and resolving top defects of the season</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Experience 3 */}
            <div className="relative mb-16">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                  <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} md:ml-auto transform hover:-translate-y-2 transition-transform duration-300`}>
                    <h3 className="text-xl font-bold mb-2">Software Intern</h3>
                    <p className="text-indigo-500 mb-2">Cognizant Technology Solutions, Hyderabad</p>
                    <p className="opacity-90 mb-2">Feb 2022 - July 2022</p>
                    <ul className="list-disc list-inside opacity-90 space-y-2">
                      <li>Built 50+ automated scripts with Selenium using the TestNG framework, reducing defects by 15%</li>
                      <li>Resolved 40+ defects, ensuring smooth application delivery</li>
                      <li>Gained hands-on experience in troubleshooting and debugging by identifying script errors and application defects</li>
                      <li>Collaborated effectively with cross-functional teams, contributing to organizational objectives</li>
                    </ul>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} border-4 border-indigo-500`}></div>
                </div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section ref={educationRef} className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
            <div className="w-20 h-1 bg-indigo-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education 1 */}
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} transform hover:-translate-y-2 transition-transform duration-300`}>
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-indigo-500/20 mr-4">
                  <Award size={24} className="text-indigo-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Master of Science in Information Technology</h3>
                  <p className="text-indigo-500">University of Cincinnati, Ohio, United States</p>
                </div>
              </div>
              <div className="ml-16">
                <p className="opacity-90 mb-2">Aug 2024 - Expected Dec 2025</p>
                <p className="opacity-90">CGPA: 4.0/4.0</p>
              </div>
            </div>
            
            {/* Education 2 */}
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} transform hover:-translate-y-2 transition-transform duration-300`}>
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-indigo-500/20 mr-4">
                  <Award size={24} className="text-indigo-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Bachelor's in Engineering</h3>
                  <p className="text-indigo-500">Jawaharlal Nehru Technological University Kakinada, India</p>
                </div>
              </div>
              <div className="ml-16">
                <p className="opacity-90 mb-2">Aug 2018 - June 2022</p>
                <p className="opacity-90">CGPA: 3.8/4.0</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section ref={certificationsRef} className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications</h2>
            <div className="w-20 h-1 bg-indigo-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Certification 1 */}
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transform hover:-translate-y-2 transition-transform duration-300`}>
              <div className="flex items-center mb-4">
                <CheckCircle2 size={24} className="text-indigo-500 mr-3" />
                <h3 className="text-lg font-bold">ISTQB-CTFL</h3>
              </div>
              <p className="opacity-90">International Software Quality Board</p>
            </div>
            
            {/* Certification 2 */}
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transform hover:-translate-y-2 transition-transform duration-300`}>
              <div className="flex items-center mb-4">
                <CheckCircle2 size={24} className="text-indigo-500 mr-3" />
                <h3 className="text-lg font-bold">AWS Certified Cloud Practitioner</h3>
              </div>
              <p className="opacity-90">Amazon Web Services</p>
            </div>
            
            {/* Certification 3 */}
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transform hover:-translate-y-2 transition-transform duration-300`}>
              <div className="flex items-center mb-4">
                <CheckCircle2 size={24} className="text-indigo-500 mr-3" />
                <h3 className="text-lg font-bold">LambdaTest Selenium Advanced</h3>
              </div>
              <p className="opacity-90">LambdaTest</p>
            </div>
            
            {/* Certification 4 */}
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transform hover:-translate-y-2 transition-transform duration-300`}>
              <div className="flex items-center mb-4">
                <CheckCircle2 size={24} className="text-indigo-500 mr-3" />
                <h3 className="text-lg font-bold">Full-Stack Web Development Bootcamp</h3>
              </div>
              <p className="opacity-90">Udemy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-indigo-500 mx-auto"></div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
              <p className="opacity-90 mb-6">
                I'm always open to discussing new opportunities, projects, or just connecting with fellow professionals in the tech industry.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white'} mr-4`}>
                    <Mail size={20} className="text-indigo-500" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="opacity-90">ramireddytarun@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white'} mr-4`}>
                    <Linkedin size={20} className="text-indigo-500" />
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="opacity-90">linkedin.com/in/tarun-ramireddy333/</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white'} mr-4`}>
                    <Github size={20} className="text-indigo-500" />
                  </div>
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="opacity-90">github.com/tarunramireddy</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <form className={`p-8 rounded-xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`} onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 focus:border-indigo-500' : 'bg-gray-50 border-gray-300 focus:border-indigo-500'} border outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`} 
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 focus:border-indigo-500' : 'bg-gray-50 border-gray-300 focus:border-indigo-500'} border outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`} 
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 focus:border-indigo-500' : 'bg-gray-50 border-gray-300 focus:border-indigo-500'} border outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`} 
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-10 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold">
                <span className="text-indigo-500">&lt;</span>
                <span>Tarun</span>
                <span className="text-indigo-500">/&gt;</span>
              </div>
              <p className="opacity-70 mt-2">Software Development Engineer in Test</p>
            </div>
            <div className="flex space-x-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:ramireddytarun@gmail.com" className="hover:text-indigo-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center opacity-70">
            <p>&copy; {new Date().getFullYear()} Tarun Venkata Reddy Ramireddy. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      <button 
        onClick={scrollToTop} 
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'} text-white`}
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}

export default App;