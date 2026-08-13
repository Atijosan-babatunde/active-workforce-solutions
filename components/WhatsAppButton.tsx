const PHONE = "447943553777"; // +44 7943 553777, in wa.me format (no + or spaces)
const MESSAGE = "Hi, I'd like to speak to someone at Active Workforce Solutions.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-black/25 hover:bg-[#20bd5a] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40 group-hover:opacity-0" />
      <svg viewBox="0 0 32 32" className="relative w-8 h-8 fill-white" aria-hidden="true">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.71 4.605 1.93 6.463L4 29l7.72-1.905A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.818c-1.91 0-3.7-.52-5.234-1.427l-.376-.223-4.583 1.132 1.213-4.464-.246-.393A9.77 9.77 0 0 1 5.182 15c0-5.968 4.855-10.818 10.822-10.818S26.818 9.032 26.818 15 21.97 24.818 16.004 24.818Zm5.94-8.144c-.325-.163-1.925-.951-2.223-1.06-.298-.109-.516-.163-.733.163-.217.326-.842 1.06-1.033 1.278-.19.217-.38.244-.706.081-.325-.163-1.373-.505-2.616-1.607-.967-.86-1.62-1.923-1.81-2.249-.19-.326-.02-.502.143-.664.146-.146.325-.38.488-.57.163-.19.217-.326.325-.543.109-.217.055-.407-.027-.57-.081-.163-.733-1.762-1.004-2.414-.264-.634-.532-.548-.733-.558l-.624-.011c-.217 0-.57.081-.868.407-.298.326-1.137 1.11-1.137 2.71 0 1.6 1.164 3.146 1.326 3.363.163.217 2.29 3.494 5.548 4.9.775.334 1.38.534 1.852.684.778.247 1.486.212 2.046.129.624-.093 1.925-.787 2.196-1.547.271-.76.271-1.412.19-1.547-.081-.136-.298-.217-.624-.38Z" />
      </svg>
    </a>
  );
}
