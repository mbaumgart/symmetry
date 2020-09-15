import { shallowMount } from '@vue/test-utils'
import Shape from '@/components/Shape.vue'

describe('Shape', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Shape)
    expect(wrapper.vm).toBeTruthy()
  })

  describe('getTransform', () => {
    test('build correct svg transform string', () => {
      const wrapper = shallowMount(Shape, {
        propsData: {
          corners: 5,
          width: 100,
          height: 100,
        }
      })
      expect(wrapper.vm.getTransform(1)).toEqual('translate(50 50) rotate(72)')
      expect(wrapper.vm.getTransform(5)).toEqual('translate(50 50) rotate(360)')
      wrapper.setProps({
        corners: 10,
        width: 120,
        height: 30,
      })
      expect(wrapper.vm.getTransform(1)).toEqual('translate(60 15) rotate(36)')
      expect(wrapper.vm.getTransform(5)).toEqual('translate(60 15) rotate(180)')
    })
  })
})
