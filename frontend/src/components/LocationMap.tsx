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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7294.848192562013!2d72.36740350000001!3d23.9100321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395cf528e5889273%3A0x781825b012da2bb7!2sMatrugaya%20Pandit%20Bindu%20Sarovar%20Sidhpur!5e0!3m2!1sen!2sin!4v1764998176237!5m2!1sen!2sin"
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

          {/* Address Card Overlay */}
          <div className="absolute bottom-6 left-6 right-6 sm:left-8 sm:bottom-8 sm:right-auto sm:max-w-sm bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-orange-100/50 animate-slide-in-left">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">📍</span>
              <span className="bg-gradient-to-r from-orange-700 to-red-700 bg-clip-text text-transparent">
                Our Address
              </span>
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4 font-light">
              24, Carat Mithai Shop Building, H/7,<br />
              Ghod Dod Rd, below Dhotiwala Bakery,<br />
              Parle Point, Meghdoot Society,<br />
              Athwalines, Athwa, Surat,<br />
              Gujarat 395007
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-orange-600">
                <span className="text-yellow-500">⭐</span>
                <span className="font-bold text-lg">4.4</span>
              </div>
              <span className="text-gray-500 text-sm">1,764 reviews</span>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=24+Carats+Mithai+Magic,Ghod+Dod+Rd,Surat,Gujarat+395007"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-full hover:shadow-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300 active:scale-95 w-full justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
