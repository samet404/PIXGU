export type MaxmindCity = {
  city: {
    geoname_id: number
    names: {
      de: string
      en: string
      fr: string
      ja: string
      ru: string
    }
  }
  continent: {
    code: string
    geoname_id: number
    names: {
      de: string
      en: string
      es: string
      fr: string
      ja: string
      'pt-BR': string
      ru: string
      'zh-CN': string
    }
  }
  country: {
    geoname_id: 298795
    iso_code: string
    names: {
      de: string
      en: string
      es: string
      fr: string
      ja: string
      'pt-BR': string
      ru: string
      'zh-CN': string
    }
  }
  location: {
    accuracy_radius: number
    latitude: number
    longitude: number
    time_zone: string
  }
  postal: {
    code: string
  }
  registered_country: {
    geoname_id: number
    iso_code: string
    names: {
      de: string
      en: string
      es: string
      fr: string
      ja: string
      'pt-BR': string
      ru: string
      'zh-CN': string
    }
  }
  subdivisions: [
    {
      geoname_id: number
      iso_code: number
      names: {
        de: string
        en: string
        es: string
        fr: string
        ja: string
        'pt-BR': string
        ru: string
        'zh-CN': string
      }
    },
  ]
} | null
