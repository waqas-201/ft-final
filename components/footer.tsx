import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, Award, Shield, Truck } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8">
          {/* Company Info - Enhanced */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Alliance Paints</h3>
                <p className="text-slate-300 text-sm">Industries</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Pakistan's leading paint manufacturer with 25+ years of excellence. We provide premium-quality paints and
              expert guidance to transform your spaces.
            </p>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-sm text-slate-300">ISO Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm text-slate-300">Quality Assured</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm text-slate-300">Free Delivery</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white border-b border-primary/30 pb-2">Products</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-primary transition-colors duration-200 flex items-center gap-2"
                >
                  Interior Paints
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-primary transition-colors duration-200">
                  Exterior Paints
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-primary transition-colors duration-200">
                  Primers & Sealers
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-primary transition-colors duration-200">
                  Specialty Coatings
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-primary transition-colors duration-200">
                  Paint Tools
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white border-b border-primary/30 pb-2">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-300 hover:text-primary transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-primary transition-colors duration-200">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-primary transition-colors duration-200">
                  Become a Dealer
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-primary transition-colors duration-200">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-primary transition-colors duration-200">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white border-b border-primary/30 pb-2">Get In Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">0314-2313681</p>
                  <p className="text-slate-400 text-sm">Mon-Sat 9AM-6PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">info@alliancepaintspk.com</p>
                  <p className="text-slate-400 text-sm">24/7 Support</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Main GT Road</p>
                  <p className="text-slate-400 text-sm">Lahore, Punjab, Pakistan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-slate-400 text-center lg:text-left">
              <p>© 2025 Alliance Paints Industries. All rights reserved.</p>
              <p className="text-sm mt-1">
                Powered by <span className="text-primary">A-H Solutions</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-sm mr-3">Follow us:</span>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
