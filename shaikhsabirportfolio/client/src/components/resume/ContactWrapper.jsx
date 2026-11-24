import Contact from "./Contact";
import ContactForm from "./ContactForm";


function ContactWrapper({ darkMode, personalInfo }) {
    return (
    <>
        <div 
        
        //  className={`flex flex-col md:flex-row justify-between items-center md:items-center gap-8 px-4 max-w-6xl mx-auto`}
        
        
        >

        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <Contact
          darkMode={darkMode}
          personalInfo={personalInfo}
        />

        <ContactForm 
          darkMode={darkMode}
          personalInfo={personalInfo}
        />

        </div>
    
    </>);
}

export default ContactWrapper;