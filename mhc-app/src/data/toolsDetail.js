export function getEmptyDetail() {
  return {
    tagline: '', website: '', pricing: '', founded: '',
    description: '',
    pros: ['', ''],
    cons: [''],
    features: [{ title: '', desc: '' }],
    faqs: [{ q: '', a: '' }],
    userReviews: [{ name: '', role: '', rating: 5, comment: '', date: '' }],
  };
}
