import { shallowMount } from '@vue/test-utils'
import PatternInput from '@/components/PatternInput.vue'

describe('PatternInput', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(PatternInput)
    expect(wrapper.vm).toBeTruthy()
  })

  describe('dragStart', () => {
    test('sets dragging to true', () => {
      const wrapper = shallowMount(PatternInput)
      wrapper.setData({ dragging: false })
      wrapper.vm.dragStart()
      expect(wrapper.vm.dragging).toEqual(true)
    })
  })

  describe('dragMove', () => {
    test('does nothing if dragging is false', () => {
      const wrapper = shallowMount(PatternInput)
      wrapper.setData({ dragging: false })
      jest.spyOn(wrapper.vm, '$emit')

      wrapper.vm.dragMove(null, 0)
      expect(wrapper.vm.$emit).not.toHaveBeenCalled()
    })

    test('calculates the new point from client mouse position and svg screen transformation matrix', () => {
      const wrapper = shallowMount(PatternInput)
      wrapper.setData({ dragging: true })
      wrapper.setProps({ points: [[1, 1]] })
      jest.spyOn(wrapper.vm, '$emit')
      const mockEvent = {
        clientX: 10,
        clientY: 10,
        target: {
          getScreenCTM() {
            return { e: 1, a: 1, f: 1, d: 1 }
          }
        }
      }

      wrapper.vm.dragMove(mockEvent, 0)
      expect(wrapper.vm.$emit).toHaveBeenCalledWith('update', [[8.1, 8.1]])
    })
  })

  describe('dragEnd', () => {
    test('sets dragging to false', () => {
      const wrapper = shallowMount(PatternInput)
      wrapper.setData({ dragging: true })
      wrapper.vm.dragEnd()
      expect(wrapper.vm.dragging).toEqual(false)
    })
  })
})
