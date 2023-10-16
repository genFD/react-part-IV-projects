import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins'

export function useDeleteCabin() {
  // give us access to our client
  const queryClient = useQueryClient()

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success('Cabin successfully deleted')
      // invalidate cache which triggers new api call
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
    },
    onError: (err) => toast.error(err.message),
  })

  return { isDeleting, deleteCabin }
}
