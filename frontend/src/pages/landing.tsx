import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function Landing() {
    const companies = [
        {
          name: 'Festa Solar',
          icon: "/A.png",
          color: 'blue',
          description: 'Premium Solar Solutions',
          login: '/a/login',
        },
        {
          name: 'Feston',
          icon: "/T.jpg",
          color: 'blue',
          description: 'Innovative Energy Distribution',
          login: '/t/login',
        },
        {
          name: 'Semicon',
          icon: "/S.png",
          color: 'green',
          description: 'Sustainable Power Systems',
          login: '/s/login',
        },
      ];


  return (
    <div className="min-h-screen bg-white">
   
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Powering the Future with Solar Energy
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
          Leading the way in solar solutions through innovation, distribution, and
          installation. We bring sustainable energy to homes and businesses across
          the globe.
        </p>
      </motion.div>


      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="p-6 hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div
                    className={`inline-flex p-4 rounded-full mb-4 ${
                      company.color === 'blue'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-green-100 text-green-600'
                    }`}
                  >
                    <img src={company.icon} alt={company.name} height={60} width={200} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {company.name}
                  </h2>
                  <p className="text-gray-600 mb-6">{company.description}</p>
                  <Button
                    className={`w-full ${
                      company.color === 'blue'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                    onClick={() => window.location.href = company.login}
                  >
                    Login to {company.name}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

 
      <footer className="bg-gray-50 mt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Contact Us</h3>
              <p className="text-gray-600">Email: info@solarsolutions.com</p>
              <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Products
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="text-center text-gray-600">
            <p>© 2024 Solar Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
