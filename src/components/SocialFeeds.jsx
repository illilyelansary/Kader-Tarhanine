import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Instagram, Youtube, Facebook, ExternalLink, Heart, MessageCircle, Share } from 'lucide-react'

const getYouTubeId = (url = '') => {
  const m =
    url.match(/(?:youtube\.com.*[?&]v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/) ||
    url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/)
  return m ? m[1] : null
}

const getYTThumb = (id, quality = 'max') =>
  `https://img.youtube.com/vi/${id}/${quality === 'max' ? 'maxresdefault.jpg' : 'hqdefault.jpg'}`

const platformIcon = (platform) => {
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

const SocialFeeds = () => {
  // ➜ Tu peux ajouter "url" par post pour activer l’aperçu automatique.
  const socialPosts = useMemo(() => ([
    {
      id: 1,
      platform: 'instagram',
      content: 'عيدكم مبارك من قلب الصحراء - Eid Mubarak from the heart of the Sahara',
      date: '8 juin 2025',
      likes: '2.5K',
      comments: '156',
      // Si tu mets l’URL exacte du post Instagram ici, on tirera l’og:image côté serveur :
      url: 'https://www.instagram.com/p/C_placeholder/',
      image: '' // facultatif : si tu laisses vide, on cherchera automatiquement
    },
    {
      id: 2,
      platform: 'facebook',
      content: 'Da Kader Tarhanine will perform at the African Beats Festival on August 9 at 6 p.m. ...',
      date: '5 août 2025',
      likes: '1.8K',
      comments: '89',
      url: 'https://www.facebook.com/kadertarhanineofficiel/posts/POST_ID',
      image: ''
    },
    {
      id: 3,
      platform: 'youtube',
      content: 'Nouveau clip "Kader tarhanine 2025 asahra" au Rudolstadt festival Allemagne',
      date: '6 juillet 2025',
      likes: '2.8K',
      comments: '234',
      url: 'https://www.youtube.com/watch?v=7SORkXHJHeg', // ➜ miniature auto
      image: '' // on l’ignorera si l’URL est YouTube
    }
  ]), [])

  const socialLinks = [
    { platform: 'Instagram', handle: '@kadertarhanine', followers: '105K', url: 'https://www.instagram.com/kadertarhanine/', icon: Instagram, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { platform: 'Facebook', handle: 'Kader Tarhanine Official', followers: '27K', url: 'https://www.facebook.com/kadertarhanineofficiel/', icon: Facebook, color: 'bg-blue-600' },
    { platform: 'YouTube', handle: 'Kader Tarhanine Official', followers: '144K', url: 'https://www.youtube.com/@kadertarhanineofficial3970', icon: Youtube, color: 'bg-red-600' },
  ]

  // Map des aperçus résolus (id -> URL image)
  const [previews, setPreviews] = useState({})

  // Résolution des aperçus au chargement
  useEffect(() => {
    let isMounted = true

    const load = async () => {
      const entries = await Promise.all(socialPosts.map(async (post) => {
        // 1) Si image déjà fournie dans les données, on la garde telle quelle
        if (post.image) return [post.id, post.image]

        // 2) Si YouTube → miniature sans appel réseau
        const ytid = post.url ? getYouTubeId(post.url) : null
        if (ytid) return [post.id, getYTThumb(ytid, 'max')]

        // 3) Sinon, on tente de récupérer og:image côté serveur
        if (post.url) {
          try {
            const r = await fetch(`/api/og-preview?url=${encodeURIComponent(post.url)}`)
            if (r.ok) {
              const data = await r.json()
              if (data?.image) return [post.id, data.image]
            }
          } catch (_) {
            // noop
          }
        }

        // 4) Fallback jolis placeholders par plateforme
        const fallback =
          post.platform === 'instagram'
            ? 'https://via.placeholder.com/400x400/f97316/ffffff?text=Instagram+Post'
            : post.platform === 'facebook'
              ? 'https://via.placeholder.com/400x300/3b82f6/ffffff?text=Facebook+Post'
              : 'https://via.placeholder.com/400x225/ef4444/ffffff?text=YouTube+Video'
        return [post.id, fallback]
      }))

      if (isMounted) {
        setPreviews(Object.fromEntries(entries))
      }
    }

    load()
    return () => { isMounted = false }
  }, [socialPosts])

  const open = (url) => window.open(url, '_blank')

  const handleImgError = (post) => (e) => {
    const src = e.currentTarget.getAttribute('src') || ''
    const id = post.url ? getYouTubeId(post.url) : null
    if (id && src.includes('maxresdefault')) {
      e.currentTarget.setAttribute('src', getYTThumb(id, 'hq'))
    } else {
      // dernier repli
      const fallback =
        post.platform === 'instagram'
          ? 'https://via.placeholder.com/400x400/f97316/ffffff?text=Instagram+Post'
          : post.platform === 'facebook'
            ? 'https://via.placeholder.com/400x300/3b82f6/ffffff?text=Facebook+Post'
            : 'https://via.placeholder.com/400x225/ef4444/ffffff?text=YouTube+Video'
      e.currentTarget.setAttribute('src', fallback)
    }
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
            {socialLinks.map((s) => {
              const Icon = s.icon
              return (
                <Card key={s.platform} className="hover-lift cursor-pointer" onClick={() => open(s.url)}>
                  <CardContent className="p-8 text-center">
                    <div className={`${s.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{s.platform}</h3>
                    <p className="text-gray-600 mb-2">{s.handle}</p>
                    <p className="text-2xl font-bold desert-orange">{s.followers}</p>
                    <p className="text-sm text-gray-500">abonnés</p>
                    <Button
                      className="mt-4 w-full"
                      variant="outline"
                      onClick={(e) => { e.stopPropagation(); open(s.url) }}
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
                      src={previews[post.id]}
                      alt={`${post.platform} post`}
                      className="w-full h-48 object-cover transition-transform duration-300"
                      loading="lazy"
                      onError={handleImgError(post)}
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                      {platformIcon(post.platform)}
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
                      <Button size="sm" variant="ghost" onClick={() => post.url && window.open(post.url, '_blank')}>
                        <Share size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Restez connectés pour toutes les dernières nouvelles et mises à jour !</p>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((s) => {
                const Icon = s.icon
                return (
                  <Button key={s.platform} onClick={() => open(s.url)} className={`${s.color} hover:opacity-90 text-white px-6 py-3 rounded-full hover-lift`}>
                    <Icon className="mr-2" size={20} />
                    {s.platform}
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
