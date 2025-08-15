        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {[
            { number: '10K+', label: 'Installations', icon: HiCube },
            { number: '99.9%', label: 'Uptime', icon: HiLightBulb },
            { number: '24/7', label: 'Support', icon: HiSparkles }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="text-center p-8 bg-white rounded-3xl shadow-xl border border-[#54bb74]/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-full flex items-center justify-center mx-auto mb-6">
                <stat.icon className="text-3xl text-white" />
              </div>
              <div className="text-4xl font-black text-[#292929] mb-3">{stat.number}</div>
              <div className="text-[#292929]/70 font-semibold text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="relative"
        >
          <div className="p-10 rounded-3xl bg-[#292929] shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Contact Info */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-4">Get in Touch</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-center md:justify-start text-gray-300">
                    <FaPhone className="mr-3 text-[#54bb74] text-lg" />
                    <span className="text-lg">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start text-gray-300">
                    <FaEnvelope className="mr-3 text-[#54bb74] text-lg" />
                    <span className="text-lg">hello@limi.lighting</span>
                  </div>
                </div>
              </div>

              {/* Logo/Brand */}
              <div className="text-center">
                <div className="text-4xl font-black text-white mb-2">LIMI</div>
                <div className="text-[#54bb74] font-semibold text-lg">Modular Lighting System</div>
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-12 h-12 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-full mx-auto mt-4 flex items-center justify-center"
                >
                  <HiLightBulb className="text-white text-2xl" />
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="text-center md:text-right">
                <h4 className="text-xl font-semibold text-white mb-4">Follow Us</h4>
                <div className="flex justify-center md:justify-end space-x-4">
                  {[
                    { icon: FaTwitter, href: '#', label: 'Twitter' },
                    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
                    { icon: FaGithub, href: '#', label: 'GitHub' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-14 h-14 bg-[#54bb74] rounded-full flex items-center justify-center text-white hover:bg-[#93cfa2] transition-colors duration-300 shadow-lg"
                      title={social.label}
                    >
                      <social.icon className="text-xl" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Credits */}
            <div className="mt-8 pt-6 border-t border-white/20 text-center">
              <p className="text-gray-400 text-sm">
                Built with Next.js, GSAP, Framer Motion, Anime.js & PlayCanvas
              </p>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mt-4 flex justify-center space-x-2"
              >
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-[#54bb74] rounded-full"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
