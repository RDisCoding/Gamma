'use client';

export default function LocationMap() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full mb-4">
            <span className="text-orange-800 text-sm font-semibold tracking-wider">LOCATION</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-700 via-red-700 to-orange-800 bg-clip-text text-transparent mb-4">
            Find Us Here
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
            Visit our office for in-person consultations and bookings
          </p>
        </div>

        {/* Map Container */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-orange-100/50 bg-white">
          {/* Decorative gradient line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 z-10"></div>
          
          {/* Google Map Embed */}
          <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d911.8642897991572!2d72.3635266!3d23.9088606!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395cf50347f8ce4f%3A0xdc657c39b8155d03!2sBindu%20sarover%20%2C%20Matrugaya%20Tirth%20%2CSiddhpur!5e0!3m2!1sen!2sin!4v1768802953480!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="24 Carats Mithai Magic Location"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
