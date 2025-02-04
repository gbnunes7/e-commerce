import { beforeEach, describe, expect, it } from 'vitest'
import { CategoriesUseCases } from '../use-cases'

import { InMemoryCategoriesRepository } from '../repository/in-memory-categories-repository'

let sut: CategoriesUseCases
let categoriesRepository: InMemoryCategoriesRepository

describe('Categories Use Cases', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new CategoriesUseCases(categoriesRepository)
  })

  it('should create a category', async () => {
    const category = await sut.createCategory({ id: 1, name: 'teste' })

    expect(category.name).toBe('teste')
  })

  it('should delete a category', async () => {
    await sut.createCategory({ id: 1, name: 'teste' })

    await sut.deleteCategory(1)

    const categories = await sut.getAllCategories()

    expect(categories).toHaveLength(0)
  })

  it.skip('should update a category', async () => {
    await sut.createCategory({ id: 1, name: 'teste' })

    const updatedCategory = await sut.updateCategory({
      id: 1,
      name: 'updated category',
    })

    expect(updatedCategory.name).toBe('updated category')
  })

  it('should get all categories', async () => {
    await sut.createCategory({ id: 1, name: 'teste' })
    await sut.createCategory({ id: 1, name: 'teste2' })

    const categories = await sut.getAllCategories()

    expect(categories).toHaveLength(2)
  })

  it('should throw an error if category already exists', async () => {
    await sut.createCategory({ name: 'teste' })

    await expect(sut.createCategory({ name: 'teste' })).rejects.toThrow()
  })
})
