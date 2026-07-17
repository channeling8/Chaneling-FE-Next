import type { PricingPlan } from './types'

export const plans: PricingPlan[] = [
    {
        name: 'Free',
        description: '개인 사용자',
        prices: {
            monthly: { price: '무료' },
            yearly: { price: '무료' },
        },
        selectButtonLabel: 'FREE 선택',
        features: [
            { label: '영상 리포트', value: '월 2개' },
            { label: '아이디어 생성', value: '월 5회' },
            { label: '분석 수준', value: '기본 모델' },
            { label: '데이터 보관', value: '최근 30일' },
        ],
    },
    {
        name: 'Creator',
        description: '성장하는 크리에이터',
        prices: {
            monthly: { price: '9,900원', unit: '/월' },
            yearly: { price: '7,920원', originalPrice: '9,900원', unit: '/월' },
        },
        selectButtonLabel: 'Creator 선택',
        features: [
            { label: '영상 리포트', value: '월 10개' },
            { label: '아이디어 생성', value: '월 30회' },
            { label: '분석 수준', value: '심층 분석' },
            { label: '데이터 보관', value: '12개월' },
        ],
    },
    {
        name: 'Pro',
        description: '전문가',
        prices: {
            monthly: { price: '29,900원', unit: '/월' },
            yearly: { price: '23,900원', originalPrice: '29,900원', unit: '/월' },
        },
        selectButtonLabel: 'Pro 선택',
        features: [
            { label: '영상 리포트', value: '월 50개' },
            { label: '아이디어 생성', value: '월 150회' },
            { label: '분석 수준', value: '최고 모델' },
            { label: '데이터 보관', value: '무제한' },
            { label: '추가 기능', value: '이메일 리포트 & 실험 기능 얼리 액세스' },
        ],
    },
]
