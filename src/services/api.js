// API Configuration and Service
const API_BASE_URL = import.meta.env.MODE === 'production' 
  ? (import.meta.env.VITE_API_URL || 'https://pharmaexport-backend.onrender.com/api')
  : 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // Health check
  async healthCheck(timeout = 10000) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await this.request('/health', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      console.log('🔍 Backend Status:', response);
      return response;
    } catch (error) {
      if (error.name === 'AbortError') {
        return { success: false, error: 'Connection timeout' };
      }
      return { success: false, error: error.message };
    }
  }

  // Medicine/Product search
  async searchMedicines(query) {
    try {
      const result = await this.get(`/products/search?q=${encodeURIComponent(query)}`);
      return result;
    } catch (error) {
      console.log('Backend search failed, using mock data:', error.message);
      // Fallback to mock data if backend is not available
      return this.getMockMedicineData(query);
    }
  }

  // Get products by category
  async getProductsByCategory(category) {
    try {
      return await this.get(`/products?category=${encodeURIComponent(category)}`);
    } catch (error) {
      console.error('Backend not available, using mock data');
      return this.getMockProductData();
    }
  }

  // Get manufacturers
  async getManufacturers() {
    try {
      return await this.get('/manufacturers');
    } catch (error) {
      return this.getMockManufacturerData();
    }
  }

  // Search by salt/generic name
  async searchBySalt(saltName) {
    try {
      return await this.get(`/products/salt/${encodeURIComponent(saltName)}`);
    } catch (error) {
      return this.getMockSaltData(saltName);
    }
  }

  // Search by manufacturer
  async searchByManufacturer(manufacturerName) {
    try {
      return await this.get(`/products/manufacturer/${encodeURIComponent(manufacturerName)}`);
    } catch (error) {
      return this.getMockManufacturerProducts(manufacturerName);
    }
  }

  // Contact form submission
  async submitContact(contactData) {
    try {
      return await this.post('/contact', contactData);
    } catch (error) {
      console.error('Contact submission failed:', error);
      throw error;
    }
  }

  // Quote request
  async requestQuote(quoteData) {
    try {
      return await this.post('/quotes', quoteData);
    } catch (error) {
      console.error('Quote request failed:', error);
      throw error;
    }
  }

  // Mock data methods (fallback when backend is not available)
  getMockMedicineData(query = '') {
    const mockData = [
      { id: 1, name: 'Paracetamol 500mg', brand: 'Crocin', price: '₹25', availability: 'In Stock', category: 'Pain Relief', image: 'https://cdn-icons-png.flaticon.com/512/8298/8298864.png' },
      { id: 2, name: 'Paracetamol 650mg', brand: 'Dolo', price: '₹32', availability: 'In Stock', category: 'Pain Relief', image: 'https://cdn-icons-png.flaticon.com/512/3096/3096342.png' },
      { id: 3, name: 'Ibuprofen 400mg', brand: 'Brufen', price: '₹45', availability: 'In Stock', category: 'Pain Relief', image: 'https://cdn-icons-png.flaticon.com/512/3004/3004458.png' },
      { id: 4, name: 'Ibuprofen 400mg', brand: 'Ibugesic', price: '₹32', availability: 'In Stock', category: 'Pain Relief', image: 'https://cdn-icons-png.flaticon.com/512/2933/2933466.png' },
      { id: 5, name: 'Amoxicillin 500mg', brand: 'Amoxil', price: '₹85', availability: 'Limited Stock', category: 'Antibiotics', image: 'https://cdn-icons-png.flaticon.com/512/822/822143.png' },
      { id: 6, name: 'Amoxicillin 250mg', brand: 'Amoclav', price: '₹65', availability: 'In Stock', category: 'Antibiotics', image: 'https://cdn-icons-png.flaticon.com/512/3030/3030611.png' },
      { id: 7, name: 'Metformin 500mg', brand: 'Glycomet', price: '₹42', availability: 'In Stock', category: 'Diabetes', image: 'https://cdn-icons-png.flaticon.com/512/3096/3096341.png' },
      { id: 8, name: 'Atorvastatin 10mg', brand: 'Lipitor', price: '₹180', availability: 'In Stock', category: 'Cardiovascular', image: 'https://cdn-icons-png.flaticon.com/512/822/822092.png' },
      { id: 9, name: 'Atorvastatin 10mg', brand: 'Atorlip', price: '₹65', availability: 'In Stock', category: 'Cardiovascular', image: 'https://cdn-icons-png.flaticon.com/512/2933/2933178.png' },
      { id: 10, name: 'Omeprazole 20mg', brand: 'Prilosec', price: '₹95', availability: 'In Stock', category: 'Gastroenterology', image: 'https://cdn-icons-png.flaticon.com/512/3004/3004456.png' },
      { id: 11, name: 'Omeprazole 20mg', brand: 'Omez', price: '₹42', availability: 'In Stock', category: 'Gastroenterology', image: 'https://cdn-icons-png.flaticon.com/512/3004/3004455.png' },
      { id: 12, name: 'Aspirin 75mg', brand: 'Disprin', price: '₹15', availability: 'In Stock', category: 'Cardiovascular', image: 'https://cdn-icons-png.flaticon.com/512/3096/3096298.png' },
      { id: 13, name: 'Doxt-SL Capsule', brand: 'Doxt-SL', price: '₹165', availability: 'In Stock', category: 'Antibiotics', image: 'https://onemg.gumlet.io/l_watermark_346,w_690,h_700/a_ignore,w_690,h_700,c_pad,q_auto,f_auto/9101a8d38de449c9b2a958fb338c9d1a.jpg' },
      { id: 14, name: 'Trelegy Ellipta Powder For Inhalation', brand: 'Trelegy Ellipta', price: '₹2825', availability: 'In Stock', category: 'Respiratory', image: 'https://onemg.gumlet.io/l_watermark_346,w_690,h_700/a_ignore,w_690,h_700,c_pad,q_auto,f_auto/rkug1ejd0dkcqilaa900.jpg' },
      { id: 15, name: 'Carepost Eye Drop', brand: 'Sun Pharmaceutical Industries Ltd'
, price: '₹600', availability: 'In Stock', category: 'Eye Care', image: 'https://onemg.gumlet.io/l_watermark_346,w_690,h_700/a_ignore,w_690,h_700,c_pad,q_auto,f_auto/cropped/jbuhupwsj6tlvxqyxfol.jpg' },
      { id: 16, name: 'New Ivermectol 12 Tablet', brand: 'Sun Pharmaceutical Industries Ltd', price: '₹82', availability: 'In Stock', category: 'Antiparasitic', image: 'https://onemg.gumlet.io/l_watermark_346,w_690,h_700/a_ignore,w_690,h_700,c_pad,q_auto,f_auto/z5kyrvcsj7stsiwver5v.jpg' },
      { id: 17, name: 'Rpigat 20mg Tablet', brand: 'Natco Pharma Ltd.', price: '₹130', availability: 'In Stock', category: 'Diabetes', image: 'https://onemg.gumlet.io/l_watermark_346,w_690,h_700/a_ignore,w_690,h_700,c_pad,q_auto,f_auto/0e219f039325459cb83771a26336a5e7.jpg' },
    ];

    if (!query) return { success: true, data: mockData };

    const filtered = mockData.filter(medicine => 
      medicine.name.toLowerCase().includes(query.toLowerCase()) ||
      medicine.brand.toLowerCase().includes(query.toLowerCase())
    );

    return { success: true, data: filtered };
  }

  getMockProductData() {
    return this.getMockMedicineData();
  }

  getMockManufacturerData() {
    return {
      success: true,
      data: [
        { id: 1, name: 'Sun Pharma', products: ['Paracetamol', 'Metformin', 'Atorvastatin'], specialties: ['Generic Medicines', 'Oncology'] },
        { id: 2, name: 'Cipla', products: ['Metformin', 'Atorvastatin', 'Salbutamol'], specialties: ['Respiratory', 'HIV/AIDS'] },
        { id: 3, name: "Dr. Reddy's", products: ['Ibuprofen', 'Omeprazole', 'Losartan'], specialties: ['Generic Drugs', 'Biosimilars'] },
        { id: 4, name: 'Ranbaxy', products: ['Amoxicillin', 'Atorvastatin', 'Ciprofloxacin'], specialties: ['Antibiotics', 'Cardiovascular'] },
        { id: 5, name: 'Abbott', products: ['Ibuprofen', 'Azithromycin', 'Clarithromycin'], specialties: ['Nutrition', 'Diagnostics'] }
      ]
    };
  }

  getMockSaltData(saltName) {
    const saltData = {
      'paracetamol': { name: 'Paracetamol', brands: ['Crocin', 'Dolo', 'Calpol'], manufacturers: ['GSK', 'Micro Labs', 'Johnson & Johnson'] },
      'ibuprofen': { name: 'Ibuprofen', brands: ['Brufen', 'Combiflam', 'Advil'], manufacturers: ['Abbott', 'Sanofi', 'Pfizer'] },
      'amoxicillin': { name: 'Amoxicillin', brands: ['Amoxil', 'Amoclav', 'Augmentin'], manufacturers: ['GSK', 'Ranbaxy', 'Sun Pharma'] },
      'metformin': { name: 'Metformin', brands: ['Glucon-D', 'Glycomet', 'Obimet'], manufacturers: ['USV', 'Sun Pharma', 'Cipla'] },
      'atorvastatin': { name: 'Atorvastatin', brands: ['Lipitor', 'Atorlip', 'Storvas'], manufacturers: ['Pfizer', 'Cipla', 'Ranbaxy'] }
    };

    const result = saltData[saltName.toLowerCase()];
    return { success: true, data: result ? [result] : [] };
  }

  getMockManufacturerProducts(manufacturerName) {
    const manufacturerProducts = {
      'sun pharma': { name: 'Sun Pharma', products: ['Paracetamol', 'Metformin', 'Atorvastatin'], specialties: ['Generic Medicines', 'Oncology'] },
      'cipla': { name: 'Cipla', products: ['Metformin', 'Atorvastatin', 'Salbutamol'], specialties: ['Respiratory', 'HIV/AIDS'] },
      'dr. reddys': { name: "Dr. Reddy's", products: ['Ibuprofen', 'Omeprazole', 'Losartan'], specialties: ['Generic Drugs', 'Biosimilars'] }
    };

    const result = manufacturerProducts[manufacturerName.toLowerCase()];
    return { success: true, data: result ? [result] : [] };
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
