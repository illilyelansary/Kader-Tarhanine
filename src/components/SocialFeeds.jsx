import React from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Instagram, Youtube, Facebook, ExternalLink, Heart, MessageCircle, Share } from 'lucide-react'

const SocialFeeds = () => {
  const socialPosts = [
    {
      id: 1,
      platform: 'instagram',
      content: 'عيدكم مبارك من قلب الصحراء - Eid Mubarak from the heart of the Sahara',
      date: '8 juin 2025',
      likes: '2.5K',
      comments: '156',
      image: 'https://via.placeholder.com/400x400/f97316/ffffff?text=Instagram+Post'
    },
    {
      id: 2,
      platform: 'facebook',
      content: 'Da Kader Tarhanine will perform at the African Beats Festival on August 9 at 6 p.m. An icon of the new wave of Tamasheq music...',
      date: '5 août 2025',
      likes: '1.8K',
      comments: '89',
      image: 'https://via.placeholder.com/400x300/3b82f6/ffffff?text=Facebook+Post'
    },
    {
      id: 3,
      platform: 'youtube',
      content: 'Nouveau clip "Kader tarhanine 2025 asahra" au Rudolstadt festival Allemagne',
      date: '6 juillet 2025',
      likes: '2.8K',
      comments: '234',
      image: 'https://via.placeholder.com/400x225/ef4444/ffffff?text=YouTube+Video'
    }
  ]

  const socialLinks = [
    {
      platform: 'Instagram',
      handle: '@kadertarhanine',
      followers: '105K',
      url: 'https://www.instagram.com/kadertarhanine/',
      icon: Instagram,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      platform: 'Facebook',
      handle: 'Kader Tarhanine Official',
      followers: '27K',
      url: 'https://www.facebook.com/kadertarhanineofficiel/',
      icon: Facebook,
      color: 'bg-blue-600'
    },
    {
      platform: 'YouTube',
      handle: 'Kader Tarhanine Official',
      followers: '144K',
      url: 'https://www.youtube.com/@kadertarhanineofficial3970',
      icon: Youtube,
      color: 'bg-red-600'
    }
  ]

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram':
        return <Instagram size={20} className="text-pink-500" />
      case 'facebook':
        return <Facebook size={20} className="text-blue-600" />
      case 'youtube':
        return <Youtube size={20} className="text-red-600" />
      default:
        return null
    }
  }

  const openSocialLink = (url) => {
    window.open(url, '_blank')
  }

  return (
    <section id="reseaux-sociaux" className="py-20 bg-gradient-to-r from-slate-50 to-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 tuareg-blue">Réseaux Sociaux</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Suivez Kader Tarhanine sur les réseaux sociaux pour ne rien manquer de son actualité et de ses performances.
            </p>
          </div>

          {/* Liens vers les réseaux sociaux */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Card key={social.platform} className="hover-lift cursor-pointer" onClick={() => openSocialLink(social.url)}>
                  <CardContent className="p-8 text-center">
                    <div className={`${social.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{social.platform}</h3>
                    <p className="text-gray-600 mb-2">{social.handle}</p>
                    <p className="text-2xl font-bold desert-orange">{social.followers}</p>
                    <p className="text-sm text-gray-500">abonnés</p>
                    <Button 
                      className="mt-4 w-full"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        openSocialLink(social.url)
                      }}
                    >
                      Suivre
                      <ExternalLink className="ml-2" size={16} />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Flux des publications récentes */}
          <div>
            <h3 className="text-3xl font-bold mb-8 desert-orange text-center">Publications Récentes</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {socialPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover-lift">
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={`${post.platform} post`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                      {getPlatformIcon(post.platform)}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Heart size={16} className="text-red-500" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle size={16} className="text-blue-500" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Share size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Restez connectés pour toutes les dernières nouvelles et mises à jour !
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Button 
                    key={social.platform}
                    onClick={() => openSocialLink(social.url)}
                    className={`${social.color} hover:opacity-90 text-white px-6 py-3 rounded-full hover-lift`}
                  >
                    <Icon className="mr-2" size={20} />
                    {social.platform}
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SocialFeeds

