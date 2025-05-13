import React, { useState, useEffect } from 'react';

/**
 * MediaLibraryModal component for selecting media from a predefined library
 */
const MediaLibraryModal = ({ isOpen, onClose, onSelect, mediaType = 'image' }) => {
  const [activeTab, setActiveTab] = useState(mediaType === 'video' ? 'videos' : 'images');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMedia, setFilteredMedia] = useState([]);
  
  // Predefined media library
  const mediaLibrary = {
    images: [
      { id: 'img1', url: 'https://images.unsplash.com/photo-1618220179428-22790b485390?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Modern Living Room' },
      { id: 'img2', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Minimalist Kitchen' },
      { id: 'img3', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Elegant Dining Room' },
      { id: 'img4', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Bedroom Design' },
      { id: 'img5', url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Home Office' },
      { id: 'img6', url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Bathroom Interior' },
      { id: 'img7', url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Modern Hallway' },
      { id: 'img8', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Cozy Reading Nook' },
      { id: 'img9', url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Pendant Lighting' },
      { id: 'img10', url: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Lighting Fixture' },
      { id: 'img11', url: 'https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Modern Lighting' },
      { id: 'img12', url: 'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Ceiling Lights' },
      { id: 'img13', url: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Pendant Lights' },
      { id: 'img14', url: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Luxury Lighting' },
      { id: 'img15', url: 'https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960_1280.jpg', title: 'Dining Room Lighting' },
      { id: 'img16', url: 'https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_1280.jpg', title: 'Living Room Lighting' },
      { id: 'img17', url: 'https://cdn.pixabay.com/photo/2020/11/24/11/36/bedroom-5772286_1280.jpg', title: 'Bedroom Lighting' },
      { id: 'img18', url: 'https://cdn.pixabay.com/photo/2017/08/27/10/16/interior-2685521_1280.jpg', title: 'Interior Lighting' },
      { id: 'img19', url: 'https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg', title: 'Ambient Lighting' },
      { id: 'img20', url: 'https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_1280.jpg', title: 'Kitchen Lighting' },
    ],
    videos: [
      { id: 'vid1', url: 'https://videos.pexels.com/video-files/3555398/3555398-hd_1920_1080_30fps.mp4', title: 'Modern Interior' },
      { id: 'vid2', url: 'https://videos.pexels.com/video-files/3770034/3770034-hd_1920_1080_25fps.mp4', title: 'Home Lighting' },
      { id: 'vid3', url: 'https://videos.pexels.com/video-files/3770035/3770035-hd_1920_1080_25fps.mp4', title: 'Designer Workspace' },
      { id: 'vid4', url: 'https://videos.pexels.com/video-files/3770036/3770036-hd_1920_1080_25fps.mp4', title: 'Pendant Lighting' },
      { id: 'vid5', url: 'https://videos.pexels.com/video-files/3770037/3770037-hd_1920_1080_25fps.mp4', title: 'Lighting Setup' },
      { id: 'vid6', url: 'https://videos.pexels.com/video-files/3770038/3770038-hd_1920_1080_25fps.mp4', title: 'Light Fixture' },
      { id: 'vid7', url: 'https://videos.pexels.com/video-files/3770039/3770039-hd_1920_1080_25fps.mp4', title: 'Ambient Lighting' },
      { id: 'vid8', url: 'https://videos.pexels.com/video-files/3946785/3946785-hd_1920_1080_30fps.mp4', thumbnail: 'https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_1280.jpg', title: 'Ceiling Light' },
      { id: 'vid9', url: 'https://videos.pexels.com/video-files/4340455/4340455-hd_1920_1080_25fps.mp4', thumbnail: 'https://cdn.pixabay.com/photo/2020/11/24/11/36/bedroom-5772286_1280.jpg', title: 'Modern TV Setup' },
      { id: 'vid10', url: 'https://videos.pexels.com/video-files/4340454/4340454-hd_1920_1080_25fps.mp4', thumbnail: 'https://cdn.pixabay.com/photo/2017/08/27/10/16/interior-2685521_1280.jpg', title: 'Modern House Interior' },
    ]
  };
  
  // Filter media based on search term
  useEffect(() => {
    const currentMedia = mediaLibrary[activeTab];
    if (!searchTerm.trim()) {
      setFilteredMedia(currentMedia);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredMedia(
        currentMedia.filter(item => 
          item.title.toLowerCase().includes(term)
        )
      );
    }
  }, [searchTerm, activeTab]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4">
      <div className="bg-[#292929] rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Media Library</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-[#3a3a3a] transition-colors"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-[#444] mb-4">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'images' ? 'text-[#50C878] border-b-2 border-[#50C878]' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('images')}
          >
            Images
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'videos' ? 'text-[#50C878] border-b-2 border-[#50C878]' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </button>
        </div>
        
        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search media..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1e1e1e] text-white p-2 rounded-md transition-all duration-300 hover:border-[#50C878] focus:border-[#50C878] focus:ring-1 focus:ring-[#50C878]"
          />
        </div>
        
        {/* Media Grid */}
        <div className="overflow-y-auto flex-grow">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredMedia.map((item) => (
              <div 
                key={item.id} 
                className="relative group cursor-pointer rounded-md overflow-hidden"
                onClick={() => onSelect(activeTab === 'videos' ? item.url : item.url)}
              >
                <img 
                  src={activeTab === 'videos' ? item.thumbnail : item.url} 
                  alt={item.title}
                  className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-2 w-full">
                    <p className="text-white text-sm truncate">{item.title}</p>
                  </div>
                </div>
                {activeTab === 'videos' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          {filteredMedia.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No {activeTab} found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaLibraryModal;
