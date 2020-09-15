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

  describe('watch corners', () => {
    test('assign a new random base rotation once corners update', async () => {
      const wrapper = shallowMount(Shape, {
        propsData: {
          corners: 5,
        }
      })
      expect(wrapper.vm.baseRotation).toEqual(0)

      jest.spyOn(Math, 'random')

      await wrapper.setProps({
        corners: 18
      })
      expect(wrapper.vm.corners).toEqual(18)
      expect(Math.random).toHaveBeenCalled()
      expect(wrapper.vm.baseRotation).not.toEqual(0)
    })
  })
})
